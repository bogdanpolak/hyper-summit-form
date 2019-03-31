const CounterApp = (htmlContainer) => {
  const h = hyperapp.h	
  const state = {
    count: 0
  }
  const actions = {
    down: value => state => ({ count: state.count - value }),
    up: value => state => ({ count: state.count + value })
  }
  const view = (state, actions) => (
    h("div", {}, [
      h("h1", {}, state.count),
      h("button", { onclick: () => actions.down(1) }, "-"),
      h("button", { onclick: () => actions.up(1) }, "+")
    ])
  )
  hyperapp.app (state, actions, view, htmlContainer)
}


const FormApp = (containerId, formDefinition) => {
  const h = hyperapp.h	
  const rangeToArray = 
    ({min,max}) => Array.from(Array(max-min+1),(v,index)=>min+index)
  // -----------------------------------
  const state = {
    tickets: 1
  } 
  const actions = {
    onChangeTicketCounter: (ev) => (
      (state) => ({ tickets: Number(ev.target.value) })
    ), 
  }
  const view = (state, actions) => {
    // -----------------------------------
    const RowSection = props => 
      h( "div", { class: "h6 form-section" }, props.row.title ) 
    // -----------------------------------
    const RowTwoColumns = props =>
      h( "div", { class:"form-row" }, 
        props.row.fields.map ( field => 
          h( "div", { class:"col-sm-6" },
            h( "fieldset", { class:"mt-1 w-100" }, [
              h( "label", { class: "mt-2 m-0", for: field.id }, field.caption ),
              h( "input", { class: "form-control", type: field.fieldType,
                  id: field.id, name: field.id, required: field.isRequired } ),
              h( "div", { class:"invalid-feedback" }, field.feedback ),
            ])
          )
        )
      )
    // -----------------------------------
    const RowTicketCount = props => 
      h( "div", { class:"form-row" }, [
        h( "fieldset", { class: "col-sm-3" }, [
          h( "label", { class: "m-0", for: props.row.select.id}, 
          props.row.select.caption ),
          h( "select", 
            { class: "form-control", 
              name: props.row.select.id,
              id: props.row.select.id, 
              onchange: (ev) => actions.onChangeTicketCounter(ev),
            },
            rangeToArray(props.row.select.range).map (
              (v) => h( "option",  { value: v }, v )
            )
          )
        ]),
        h( "div", { class: "col-sm-9 mt-0" }, [
          h( "p", { class:"mb-0" }, props.row.total.caption ),
          h( "h5", { class:"mt-0" }, [
            h( "span", 
              { id: props.row.total.id },
              state.tickets*props.row.ticketValue
            ),
            " zł"
          ]),
        ])
      ])
    // -----------------------------------
    const RowAgreeGDPR = props => { 
      const htmInput =  h ( "input", 
        { type: "checkbox", class: "form-check-input mt-2", 
          id: props.row.name,
          name: props.row.name,
          required: props.row.isRequired }
      )
      const htmLabel = h ( "label", 
        { class: "form-check-label", for: props.row.name }, 
        props.row.caption 
      )
      const htmFeedback = h ( "div", { class: "invalid-feedback mb-2" }, 
        props.row.feedback )
      const htmDescription = h ("div", { class: "small" }, 
        props.row.description )
      return (
        h( "div", { class: "form-group mt-2" },
          h ( "div", { class: "form-check" }, 
              [ htmInput, htmLabel, htmFeedback, htmDescription ] ) ) )
    }
    // -----------------------------------
    const RowSubmitButton = props => {
      return  h ( "div", { class: "text-center px-5" },
        h ( "button", { class:"btn btn-primary col-sm-6", type:"submit" },  [
          h ( "span", { class: "default-submit" }, props.row.caption ),
          props.row.withSpinner && (
            h ( "span", { class: "busy-submit"}, [
              h ( "div", { class: "spinner-border spinner-border-sm" } ),
              props.row.busyCaption
            ] )
          )
        ] )
      )
    }
    // -----------------------------------
    const Form = props => 
      h( "form", { id: props.formId, class: "needs-validation" }, 
        props.formModel.map( (row) => {
          switch (row.rowType) {
            case "section":
              return h( RowSection, { row: row } )
            case "two-columns":
              return h( RowTwoColumns, { row: row } )
            case "ext-tickets":
              return h( RowTicketCount, { row: row } )
            case "confirm-gdpr":
              return h( RowAgreeGDPR, { row: row } );
            case "submit":
              return h( RowSubmitButton, { row: row } );
            default:
              return h( "div", { class: "row" }, row.rowType )

          }
        }) 
      )
    // -----------------------------------
    return h( Form, {
      formId: formDefinition.formId,  
      formModel: formDefinition.model
    } )
  }
  hyperapp.app (state, actions, view, containerId)
}

const formRedererHyperApp = {
  reportErrors: errors => (errors.map ( 
    (msg) => console.error(msg) )
  ),
  generateDemo: function(containerId) {
    CounterApp ( document.getElementById (containerId) )
  },
  generate: function (containerId, formDefinition) {
    const htmlRootElem = document.getElementById(containerId);
    const isValid = paramsValidator.validate (
      containerId, htmlRootElem, formDefinition
    );
    if (isValid) {
      FormApp (
        document.getElementById(containerId), 
        formDefinition
      )
    } else {
      this.reportErrors(paramsValidator.errorMessageList);
    }
  }
}

const paramsValidator = {
  errorMessageList: [],
  logError: function (msg) {
    this.errorMessageList.push(msg);
  },
  validate: function (sectionID, rootElem, definition) {
    this.errorMessageList = [];
    var v1 = (typeof sectionID === "string") || this.logError (
      "param1: sectionID string paramerer is required");
    var v2 = (rootElem !== null) || this.logError (
      "param1: sectionID has to be proper id of the HTML element");
    var v3 = (typeof definition === "object") || this.logError (
      "param2: formDefinition has to be object");
    var v4 = v3 && (typeof definition.formID === "string" || this.logError (
      "param2: formDefinition.formID: string is required"));
    var v5 = v3 && (Array.isArray(definition.model) ||  this.logError (
      "param2: formDefinition.model: Array is required"));
    return v1 && v2 && v3 && v4 && v5;
  },
}

