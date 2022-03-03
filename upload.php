<?php 

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['file'])) {
            $maxSize = 50 * pow(1024, 2);

            $file = $_FILES['file'];

            if ($file['size'] <= $maxSize) {
                $path = 'src/uploads/' . basename($file['name']);

                if (move_uploaded_file($file['tmp_name'], $path)) {
                    echo json_encode(['status' => 'ok']);
                    exit;
                } else {
                    echo json_encode(['status' => 'error']);
                    exit;
                }
            }

            echo json_encode(['status' => 'error']);
            exit;
        }
        echo json_encode(['status' => 'error']);
        exit;
        
    }

?>