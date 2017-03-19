(function() {
	"use strict";

	var dropZone = document.getElementById('drop-zone');
	var barFill = document.getElementById('bar-fill');
	var barFillText = document.getElementById('bar-fill-text');
	var uploadsFinished = document.getElementById('uploads-finished');

	var startUpload = function (files) {
		app.uploader({
			files: files,
			progressBar: barFill,
			progressText: barFillText,
			processor: 'upload.php',

			finished: function(data) {
				var x;
				var uploadedElement;
				var uploadedAnchor;
				var uploadedStatus;
				var currFile;

				for(x = 0; x < data.length; x = x+1) {
					currFile = data[x];

					uploadedElement = document.createElement('div');
					uploadedElement.className = 'upload-console-upload';

					uploadedAnchor = document.createElement('a');
					uploadedAnchor.textContent = currFile.name;

					if(currFile.uploaded) {
						uploadedAnchor.href = 'uploads/' + currFile.file;
					}

					uploadedStatus = document.createElement('span');
					uploadedStatus.textContent = currFile.uploaded ? 'Uploaded' : 'Failed';

					uploadedElement.appendChild(uploadedAnchor);
					uploadedElement.appendChild(uploadedStatus);

					uploadsFinished.appendChild(uploadedElement);
				}

				uploadsFinished.className = '';
			},
			error: function() {
				console.log('There was an error');
			}
		});
	}

	//standart form upload'
	document.getElementById('standard-upload').addEventListener('click', function(e){
		var standardUploadFiles = document.getElementById('standard-upload-files').files;
		e.preventDefault();

		startUpload(standardUploadFiles);
	});

	//Drop functionality
	dropZone.ondrop = function(e){
		e.preventDefault();
		this.className="upload-console-drop";
		startUpload(e.dataTransfer.files);
	};

	dropZone.ondragover = function() {
	 	this.className="upload-console-drop drop";
		return false;
	};

	dropZone.ondragleave = function() {
		this.className = "upload-console-drop";
		return false;
	};
}());