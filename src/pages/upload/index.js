Page({
  data: {
    imgs: {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': []},
    keys: ["top", 'pullover','outerwear','bottom','shoe','bag'],
  },
  onChooseImage(e) {
    my.chooseImage({
      count: 5,
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
  onPost(){
    my.request({
      url: 'https://127.0.0.1:5000/create-outfit',
      method: 'POST',
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1NTk0NjU2MSwianRpIjoiZGYyY2IyZjEtNzAyMC00NWVlLWI2ZjgtMTNkYjk4ZDJlMzAwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImxvbmcubHQiLCJuYmYiOjE2NTU5NDY1NjEsImV4cCI6MTY4NzQ4MjU2MX0.uIMrMgymKshKfpI8iXPln1ByRA63wUoffnhcYwBPiC8"
      },
      data: {'items': this.data.imgs, "desc": this.data.desc},
      success: (response) => {
        this.setData({desc: e.detail.value,imgs: {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': []}})
        // this.setData({outfit: response.data,isLoading: false})
      }
    });
  }
});