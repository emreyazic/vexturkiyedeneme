export default {
    name: 'siteSettings',
    title: 'Site Ayarları',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Site Başlığı',
            type: 'string',
            description: 'Tarayıcı sekmesinde görünecek ana başlık (örn: VEX Robotics Türkiye)'
        },
        {
            name: 'logo',
            title: 'Site Logosu',
            type: 'image',
            description: 'Header (üst menü) kısmında görünecek logo',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'favicon',
            title: 'Favicon',
            type: 'file',
            description: 'Tarayıcı sekme ikonu (.ico, .png veya .svg formatında)',
            options: {
                accept: 'image/*'
            }
        }
    ]
}
