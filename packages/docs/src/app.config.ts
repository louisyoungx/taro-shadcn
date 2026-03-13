export default defineAppConfig({
    pages: [
        'pages/intro/index',
        'pages/list/index',
        'pages/about/index',
        'pages/detail/index',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'taro-shadcn',
        navigationBarTextStyle: 'black',
    },
    tabBar: {
        color: '#737373',
        selectedColor: '#0a0a0a',
        backgroundColor: '#ffffff',
        borderStyle: 'black',
        list: [
            {
                pagePath: 'pages/intro/index',
                text: '介绍',
                iconPath: './assets/tabbar/sparkles.png',
                selectedIconPath: './assets/tabbar/sparkles-active.png',
            },
            {
                pagePath: 'pages/list/index',
                text: '组件',
                iconPath: './assets/tabbar/layout-grid.png',
                selectedIconPath: './assets/tabbar/layout-grid-active.png',
            },
            {
                pagePath: 'pages/about/index',
                text: '关于',
                iconPath: './assets/tabbar/info.png',
                selectedIconPath: './assets/tabbar/info-active.png',
            },
        ],
    },
})
