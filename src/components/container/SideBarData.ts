export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: 'nav-icon fa fa-home',
        cName: '',
        submenu: [],
        permissao: ['IS_USER', 'IS_MASTER']
    },

    {
        title: 'Cadastros',
        path: '/',
        icon: 'nav-icon far fa-edit',
        cName: '',
        permissao: ['IS_MASTER'],
        submenu: [
            {
                title: 'Pessoa',
                path: '/pessoa'
            },
            {
                title: 'Page One',
                path: '/paginaone'
            },
            {
                title: 'Page Two',
                path: '/pessoas'
            },
            
        ]
    },
    {
        title: 'Relatórios',
        path: '/',
        icon: 'nav-icon far fa-file',
        cName: '',
        permissao: ['IS_USER', 'IS_MASTER'],
        submenu: []      
    }
]