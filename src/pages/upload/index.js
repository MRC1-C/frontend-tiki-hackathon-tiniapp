Page({
  data: {
    imgs: {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': [],'dress': []},
    keys: ['top','bottom','shoe'],
    selected2:  { key: 1, label: 'Outfit 1 (Top, Bottom, Shoe)',keys: ['top','bottom','shoe']},
    items2: [
      { key: 1, label: 'Outfit 1 (Top, Bottom, Shoe)', keys: ['top','bottom','shoe']},
      { key: 2, label: 'Outfit 2 (Top, Bottom, Shoe, Bag)',keys: ['top','bottom','shoe','bag'] },
      { key: 3, label: 'Outfit 3 (Top ,Outerwear, Bottom, Shoe, Bag)',keys: ['top','outerwear','bottom','shoe','bag'] },
      { key: 4, label: 'Outfit 4 (Top, Dress, Shoe, Bag)',keys: ['top','dress','shoe','bag'] },
      { key: 5, label: 'Outfit 5 (Dress, Shoe, Bag)',keys: ['dress','shoe','bag'] },
    ],
    isLoading: true,
    dataDetail: [],
    numOfCases: 1,
    show: false,
    isResult: false,
    showSave: false,
    current: 0,
  },
  onChange(e) {
    console.log('onChange: ', e.detail.current);
    this.setData({
      current: e.detail.current
    })
  },
  handleShowModal() {
    let num = 1
    Object.keys(this.data.imgs).forEach(e=>{
      if(this.data.imgs[e].length > 0)
        num = num * this.data.imgs[e].length
    })
    
    this.setData({isLoading: true,numOfCases: num,show: true})
    this.onPost()
  },
  handleHideModalSave() {
    this.setData({ showSave: false });
  },
  handleOutfit(){
    this.handleHideModalSave()
    my.navigateTo({ url: 'pages/my-outfit/index' });
  },
  handleSave(){
    let dataResult = this.data.dataDetail[this.data.current]
    let dt = {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': [],'dress': []}
    this.data.selected2.keys.forEach((e,index)=>dt[e].push(dataResult[index]))
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
          data: {'items': dt, "desc": "My Outfit"},
          success: (response) => {
            // my.navigateTo({ url: 'pages/my-outfit/index' });
            // bind.setData({desc: e.detail.value,imgs: {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': []}})
            bind.setData({showSave: true})
          }
        });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
  },
  handleShowModalSave() {

    this.setData({showSave: true})
  },
  handleHideModal() {
    this.setData({ show: false });
  },
  handleResult(){
    this.handleHideModal();
    this.setData({ isResult: true });
  },
  onSelect2(selected2) {
    // this.setData({keys: selected2.keys})
    this.setData({ selected2,keys: selected2.keys });
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
      url: 'https://127.0.0.1:5000/suggest-outfit',
      method: 'POST',
      data: {'items': this.data.imgs},
      timeout: 300000,
      success: (response) => {
        // my.navigateTo({ url: 'pages/my-outfit/index' });
        this.setData({isLoading: false})
        let data = []
        response['outfit_suggestion_list'].forEach(e=>{
          let dt = e.filter(el => el!=null)
          console.log(dt)
          data.push(dt)
        })
        this.setData({dataDetail: data,imgs: {'top': [],'pullover': [],'outerwear': [],'bottom': [],'shoe': [],'bag': [],'dress': []},})
      }
    });
  }
});