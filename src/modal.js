/* ------------------------------------------------------------------------
 * Dynamic Modal Popup - Bootstrap 4
 * ------------------------------------------------------------------------ */

const ModalWindow = function (modalID) {
	this.modalID = modalID || this.__getUniqueID('modal');
	this.modalWin = document.createElement('div');
	var modal = this.modalWin;
	modal.id = this.modalID;
	modal.className = "modal fade";
	modal.setAttribute("tabindex",1 );
	modal.setAttribute("role","dialog");
	modal.setAttribute("aria-hidden", "true");
	modal.innerHTML = 
		'<div class="modal-dialog modal-dialog-centered" role="document">'
			+'<div class="modal-content">'
				+'<div class="modal-header alert alert-danger">'
					+'<div class="h5 modal-title">Błąd</div>'
					+'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
						+'<span aria-hidden="true">&times;</span>'
					+'</button>'
				+'</div>'
				+'<div class="modal-body text-danger"></div>'
				+'<div class="modal-footer">'
					+'<button type="button" class="btn btn btn-primary" data-dismiss="modal">'
						+'Zamknij'
					+'</button>'
				+'</div>'
			+'</div>'
		+'</div>';
	this.element = {
		header: modal.getElementsByClassName ('modal-header')[0],
		title: modal.getElementsByClassName ('modal-title')[0],
		body: modal.getElementsByClassName ('modal-body')[0],
	};
	document.body.appendChild(modal);
}
ModalWindow.prototype.__getUniqueID = function (prefix) {
	return prefix+'-'+Date.now()%3600000;
}
ModalWindow.prototype.__clearAccent = function (type) {
	this.element.header.classList.remove('alert-danger')
	this.element.header.classList.remove('alert-success')
	this.element.header.classList.remove('alert-warning')
	this.element.header.classList.remove('alert-info')
	this.element.body.classList.remove('text-danger')
	this.element.body.classList.remove('text-success')
	this.element.body.classList.remove('text-warning')
	this.element.body.classList.remove('text-info')
}
ModalWindow.prototype.__showWindow = function (params) {
	this.element.title.innerHTML = params.title
	this.element.body.innerHTML = params.info
	$(this.modalWin).modal()
}
ModalWindow.prototype.showSuccess = function (params) {
	this.__clearAccent()
	this.element.header.classList.add('alert-success')
	this.element.body.classList.add('text-success')
	this.__showWindow(params)
}
ModalWindow.prototype.show = function (params) {
	this.__clearAccent()
	this.__showWindow(params)
}
ModalWindow.prototype.showDanger = function (params) {
	this.__clearAccent()
	this.element.header.classList.add('alert-danger')
	this.element.body.classList.add('text-danger')
	this.__showWindow(params)
}
ModalWindow.prototype.showWarning = function (params) {
	this.__clearAccent()
	this.element.header.classList.add('alert-warning')
	this.element.body.classList.add('text-warning')
	this.__showWindow(params)
}
ModalWindow.prototype.showInfo = function (params) {
	this.__clearAccent()
	this.element.header.classList.add('alert-info')
	this.element.body.classList.add('text-info')
	this.__showWindow(params)
}
