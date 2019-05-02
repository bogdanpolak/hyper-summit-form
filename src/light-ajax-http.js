/*
 * see: https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
 */

function AjaxHttpGet (url, onSuccess, onFailure) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if(xhr.status === 200)
				try {
					onSuccess (JSON.parse(xhr.responseText));
				} catch (e) {
					console.log(xhr.responseText);
					onFailure (-1,xhr.responseText);
				}
			else
				onFailure (xhr.status,xhr.responseText);
		}
	};
	const IS_ASYNC = true;
	xhr.open('GET', url, IS_ASYNC); 
	xhr.send(null);
}

function AjaxHttpPost (url, jsonData, onSuccess, onFailure) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if(xhr.status === 200)
				try {
					onSuccess (JSON.parse(xhr.responseText));
				} catch (e) {
					console.log(xhr.responseText);
					onFailure (-1,xhr.responseText);
				}
			else
				onFailure (xhr.status,xhr.responseText);
		}
	};
	const IS_ASYNC = true;
	xhr.open('POST', url, IS_ASYNC); 
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(jsonData));
}

function AjaxHttpPut (url, jsonData, onSuccess, onFailure) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if(xhr.status === 200) {
				var jsonResponse = JSON.parse(xhr.responseText);
				if (jsonResponse) {
					onSuccess (jsonResponse);
				} else {
					onFailure (-1,xhr.responseText);
				}
			} else {
				onFailure (xhr.status,xhr.responseText);
			}
		}
	};
	const IS_ASYNC = true;
	xhr.open('PUT', url, IS_ASYNC); 
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(jsonData));
}
