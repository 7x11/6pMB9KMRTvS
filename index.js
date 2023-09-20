// Version: 1.0.2
// Reason: Added the complete list of categories based on user's request.

Page({
  data: {
    categories: [
      { cid: 0, name: '全部' },
      { cid: 1, name: '女装' },
      { cid: 2, name: '男装' },
      { cid: 3, name: '内衣' },
      { cid: 4, name: '美妆' },
      { cid: 5, name: '配饰' },
      { cid: 6, name: '鞋品' },
      { cid: 7, name: '箱包' },
      { cid: 8, name: '儿童' },
      { cid: 9, name: '母婴' },
      { cid: 10, name: '居家' },
      { cid: 11, name: '美食' },
      { cid: 12, name: '数码' },
      { cid: 13, name: '家电' },
      { cid: 14, name: '其他' },
      { cid: 15, name: '车品' },
      { cid: 16, name: '文体' },
      { cid: 17, name: '宠物' },
    ],
    currentCategory: 0,
    products: [],
  },

  onLoad: function () {
    this.fetchProducts(this.data.currentCategory);
  },

  switchCategory: function (event) {
    const cid = event.currentTarget.dataset.cid;
    if (cid !== this.data.currentCategory) {
      this.setData({
        currentCategory: cid,
      });
      this.fetchProducts(cid);
    }
  },

  fetchProducts: function (cid = 0) {
    const that = this;
    wx.showLoading({
      title: '加载中请稍后哦',
    });
    wx.request({
      url: `https://v2.api.haodanku.com/jd_hot_rank?apikey=E12786868AB4&min_id=1&cid=${cid}`,
      success(res) {
        if (res.data.code === 200) {
          that.setData({
            products: res.data.data,
          });
          wx.hideLoading();
          wx.showToast({
            title: '成功啦',
            icon: 'success',
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '失败',
            icon: 'none',
          });
        }
      },
      fail() {
        wx.hideLoading();
        wx.showToast({
          title: '失败',
          icon: 'none',
        });
      },
    });
  },
});
