import { getUserInfo, getNumOrders } from '../../services/index';
import { loadBadgeCart } from '../../utils/navigate';

Page({
  data: {
    isLoading: false,
    user: {},
    numOrders: {},
    username: undefined,
    show: false,
    show1: false,
    isLogin: false,
  },

  onCustomIconEvent(e) {
    my.navigateTo({ url: 'pages/cart/index' });
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const [user, numOrders] = await Promise.all([
        getUserInfo(),
        getNumOrders(),
      ]);

      this.setData({
        user,
        numOrders,
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  // Life cycle
  onShow() {
    let bind = this
    my.getStorage({
      key: 'access_token',
      success: function (res) {
        console.log(!res.data)
        if(!!res.data){
          console.log('asdf')
          bind.setData({isLogin: true})
        }
      },
      fail: function (res) {
        bind.setData({isLogin: false})
      }
    });
    loadBadgeCart('/assets/images/ic-cart-account.png');
  },
  
  onReady() {
    this.loadData();
  },
  onUpload(){
    my.navigateTo({ url: `pages/upload/index` });
  },
  handleShowModal() {
    this.setData({ show: true });
  },

  handleHideModal() {
    this.setData({ show: false });
  },
  handleShowModal1() {
    this.setData({ show1: true });
  },

  handleHideModal1() {
    this.setData({ show1: false });
  },
  onSubmit1(e){
    console.log(e.detail.value)
    my.request({
      url: 'https://127.0.0.1:5000/signup',
      method: 'POST',
      data: e.detail.value,
      success: (response) => {
        this.setData({isLogin: true,show: true});
        this.handleHideModal1()
      }
    });
  },
  onSubmit(e){
    console.log(e.detail.value)
    my.request({
      url: 'https://127.0.0.1:5000/login',
      method: 'POST',
      data: e.detail.value,
      success: (response) => {
        this.setData({isLogin: true,username: e.detail.value.username});
        this.handleHideModal()
        my.setStorage({
          key: 'access_token',
          data: response['access_token']
        });
      }
    });
  },
  onSignout(){
    this.setData({isLogin: false})
    console.log(this.data.isLogin)
    my.setStorage({
      key: 'access_token',
      data: undefined
    });
  }
});
