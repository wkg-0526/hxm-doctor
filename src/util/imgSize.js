const imgSize = file => {
  return new Promise((resolve, reject) => {
    let width = 400;
    let height = 400;
    let url = window.URL || window.webkitURL;
    let img = new Image();
    img.onload = function() {
      // 图片比例校验
      let valid = img.width == width && img.height == height;
      valid ? resolve() : reject();
    };
    img.src = url.createObjectURL(file);
  }).then(
    () => {
      return file;
    },
    () => {
      return Promise.reject();
    }
  );
};

export default imgSize;
