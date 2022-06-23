Page({
  data: {
    imgs: {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': []},
    keys: ["top", 'pullover','outerwear','bottom','shoe','bag'],
    desc: ""
  },
  onChooseImage(e) {
    my.chooseImage({
      count: 1,
      success: (res) => {
        let type = e.target.dataset['view-name'];
        let formData = new FormData();
        // formData.append('type',type);
        formData.append("upload_preset", "new_preset");
        res.filePaths.forEach(element => {
          my.uploadFile({
            url: 'https://api.cloudinary.com/v1_1/mrcj/image/upload',
            fileType: 'image/*',
            fileName: 'file',
            filePath: element,
            formData: formData,
            success: (res) => {
              response = JSON.parse(res)
              let data = this.data.imgs;
              data[type].push(response.url) 
              this.setData({
                imgs: data
              })
            },
            fail: function (res) {
              console.log(res);
            }
          });
        });
      },
      fail: (e) => {
        console.log(e);
      }
    });
  },
  onClearUpload(e){
    let type = e.target.dataset['view-name'];
    let data = this.data.imgs;
    data[type] = []
    this.setData({
      imgs: data
    })
  },
  onInput(e){
    this.setData({desc: e.detail.value})
  }
  ,
  onPost(){
    let bind = this
    my.getStorage({
      key: 'access_token',
      success: function (res) {
        my.request({
          url: 'https://127.0.0.1:5000/create-outfit',
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + res.data
          },
          data: {'items': bind.data.imgs, "desc": bind.data.desc},
          success: (response) => {
            my.navigateTo({ url: 'pages/my-outfit/index' });
            bind.setData({desc: e.detail.value,imgs: {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': []}})
            // this.setData({outfit: response.data,isLoading: false})
          }
        });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
    
  }
});