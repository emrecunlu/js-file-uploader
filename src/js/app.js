let fileInput = document.getElementById('file');
let userFiles = [];

const getIcon = (type) => {
    let fileType = type ?? 'doc';
    
    if (['png', 'jpeg', 'jpg', 'svg'].includes(fileType.toLowerCase())) {
        return 'image.svg';
    } else return 'doc.svg';
}

const fileUploader = (index) => {
    const {file, el} = userFiles[index];
    const formData = new FormData();
    const request = new XMLHttpRequest();

    formData.append('file', file);

    request.upload.addEventListener('progress', (e) => {
        let percent = (e.loaded / e.total) * 100;

        el.querySelector('.progress > .bar').style.width = `${percent}%`;
    });

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (JSON.parse(request.response).status === 'ok') el.classList.add('completed');
            else el.classList.add('error');
        }
    }

    request.addEventListener('loadend', (e) => {
        if (index + 1 < userFiles.length) fileUploader(index + 1);
    });

    request.open('POST', 'upload.php');
    request.send(formData);

}

const showFiles = (files) => {
    let maxSize = 50 * Math.pow(1024, 2);

    if (files.length > 0) {
        files.map(file => {
            let fileDiv = document.createElement('div'),
                totalSize = file.size;
            fileDiv.className = 'file';
    
            fileDiv.innerHTML = `
            <div class="details">
                <div class="icon">
                    <img src="src/icons/${getIcon(file.type.split('/')[1])}" alt="">
                </div>
                <div class="title">
                    <span>${file.name.substring(0, 21)}...</span>
                </div>
                </div>
                <div class="progress">
                    <div class="bar"></div>
                </div>
                <img src="src/icons/check.svg" alt="">`

            if (totalSize <= maxSize) userFiles.push({file: file, el: fileDiv});
            else fileDiv.classList.add('error');

            document.querySelector('.files').appendChild(fileDiv);
        });

        if (userFiles.length > 0) fileUploader(0);
    }
}

document.querySelector('.uploader').addEventListener('drop', (event) => {
    event.preventDefault();

    showFiles([...event.dataTransfer.files]);
});

document.querySelector('.uploader').addEventListener('dragover', (event) => {
    event.preventDefault();
});

fileInput.addEventListener('change', (e) => {
    showFiles([...e.target.files]);
});