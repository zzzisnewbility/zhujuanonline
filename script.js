let currentTheme = "";

// 选择主题时显示上传控件
function selectTheme(theme) {
    currentTheme = theme;
    document.getElementById("current-theme").innerText = getThemeName(theme);
    document.getElementById("file-upload-section").style.display = "block"; // 显示上传控件
    loadPhotos(); // 加载该主题的照片
}

// 上传照片
function uploadPhoto() {
    const input = document.getElementById("photo-input");
    if (input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const photoData = e.target.result;
            savePhoto(photoData, file.name); // 保存照片到 LocalStorage
            displayPhoto(photoData, file.name); // 显示照片
        };

        reader.readAsDataURL(file);
        input.value = ""; // 清空上传控件
    }
}

// 保存照片到 LocalStorage
function savePhoto(photoData, fileName) {
    const photos = getPhotos();
    photos.push({ data: photoData, name: fileName });
    localStorage.setItem(`photos_${currentTheme}`, JSON.stringify(photos));
}

// 加载照片
function loadPhotos() {
    const photoContainer = document.getElementById("photo-container");
    photoContainer.innerHTML = ""; // 清空当前内容
    const photos = getPhotos();

    photos.forEach(photo => {
        displayPhoto(photo.data, photo.name);
    });
}

// 获取当前主题的照片
function getPhotos() {
    return JSON.parse(localStorage.getItem(`photos_${currentTheme}`)) || [];
}

// 显示照片及功能按钮
function displayPhoto(photoData, fileName) {
    const photoContainer = document.getElementById("photo-container");

    const photoWrapper = document.createElement("div");
    photoWrapper.classList.add("photo-wrapper");

    const img = document.createElement("img");
    img.src = photoData;
    img.alt = fileName;

    const downloadBtn = document.createElement("a");
    downloadBtn.innerText = "下载";
    downloadBtn.href = photoData;
    downloadBtn.download = fileName;
    downloadBtn.classList.add("download-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "×";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        photoWrapper.remove();
        deletePhoto(photoData);
    };

    photoWrapper.appendChild(img);
    photoWrapper.appendChild(deleteBtn);
    photoWrapper.appendChild(downloadBtn);
    photoContainer.appendChild(photoWrapper);
}

// 删除照片
function deletePhoto(photoData) {
    let photos = getPhotos();
    photos = photos.filter(photo => photo.data !== photoData);
    localStorage.setItem(`photos_${currentTheme}`, JSON.stringify(photos));
}

// 获取主题名称
function getThemeName(theme) {
    switch (theme) {
        case "travel": return "旅行";
        case "party": return "聚会";
        case "daily": return "日常";
        default: return "未选择";
    }
}

