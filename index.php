<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="src/css/style.css">
</head>
<body>
    <div class="uploader">
        <input type="file" id="file" multiple>
        <label for="file">
            <div class="icon">
                <img src="src/icons/upload-cloud.svg" alt="">
            </div>
            <div class="title">
                <h1>Drag & Drop</h1>
                <p>or select files from device</p>
            </div>
            <div class="size-limit">
                <span>max. 50MB</span>
            </div>
        </label>
    </div>
    <div class="files"></div>

    <script src="src/js/app.js"></script>
</body>
</html>