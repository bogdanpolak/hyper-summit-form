const fillTicketForm = {
	samples: [
		{
			person: "",
			position: "",
			email: "",
			phone: "",
			company: "",
			address: "",
			postalCode: "",
			city: "",
			nip: "",
		}, {
			person: "Jan Kowalski",
			position: "Zawodowy Koder",
			email: "jan.kowalski@zgbd.com.pl",
			phone: "691-591-491",
			company: "Zakład Globalnych Baz Danych Sp. z o.o.",
			address: "ul. Mirosławska 32",
			postalCode: "09-876",
			city: "Janulkowice Małe",
			nip: "257-45-32-198",
		}, {
			person: "Tomasz Tomarski",
			position: "Młody Architekt",
			email: "tomcio@paluch.waw.pl",
			phone: "345-678-912",
			company: "Paluch Corporation",
			address: "ul. Kwiatkowa 141",
			postalCode: "00-000",
			city: "Warszawa",
			nip: "111-22-33-444",
		}
	],

	fill: function(index) {
		if ( (index < 0) || (index >= this.samples.length ) ) {
			index = 0
		}
		sample = this.samples[index]
		for (var key in sample){
			if (sample.hasOwnProperty(key)) {
                const html = document.getElementById(key)
                if (html) 
                    (html.value = sample[key])
                else
                    console.error ('No HTML element with id',key)
			}
		}
	},

	clean: function () {
		this.fill(0)
	},

};
