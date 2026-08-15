'use client'

import React from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
    ArrowRight, ArrowLeft, Target, Award, Package, Trophy,
    Sparkles, Gamepad2, Puzzle, Bot, Cpu, Factory, GraduationCap,
    CheckCircle2, Zap
} from 'lucide-react'

type LangText = {
    TR: string
    EN: string
}

type Program = {
    id: string
    name: string
    fullName: LangText
    tagline: LangText
    ageRange: LangText
    color: string
    secondaryColor: string
    icon: React.ComponentType<{ className?: string }>
    description: LangText
    purpose: LangText
    achievements: LangText[]
    kitContents: { name: LangText; description: LangText }[]
    competitionRules: { title: LangText; description: LangText }[]
    gameSummary?: { title: LangText; description: LangText }
    extraLinks?: { title: LangText; url: string }[]
}

const slugMap: Record<string, string> = {
    'recf-engage': 'engage',
    'recf-achieve': 'achieve',
    'recf-inspire': 'inspire',
    'aerial-drone-competition': 'adc',
    'adc-pro': 'adc-pro',
    'engage': 'engage',
    'achieve': 'achieve',
    'inspire': 'inspire',
    'adc': 'adc',
    'vex-123': 'vex-123',
    'vex-go': 'vex-go',
    'vex-ai': 'vex-ai',
    'online-challenges': 'online-challenges'
}

const tr = (TR: string, EN: string): LangText => ({ TR, EN })

const programsData: Record<string, Program> = {
    'vex-123': {
        id: 'vex-123',
        name: 'VEX 123',
        fullName: tr('Eğitime Hazırlık Araçları: VEX 123', 'Education Preparation Tools: VEX 123'),
        tagline: tr('Kodlamaya ilk adım', 'The first step into coding'),
        ageRange: tr('4-7 yaş', 'Ages 4-7'),
        color: '#00A651',
        secondaryColor: '#7ED321',
        icon: Sparkles,
        description: tr(
            'VEX 123, okul öncesi ve ilkokul başlangıcındaki çocuklar için tasarlanmış, ekransız kodlama deneyimi sunan robotik platformudur. Oyun temelli öğrenme yaklaşımıyla çocukların problem çözme ve mantıksal düşünme becerilerini geliştirir.',
            'VEX 123 is a robotics platform designed for preschool and early elementary students that provides a screen-free coding experience. Its game-based learning approach develops problem-solving and logical thinking skills.'
        ),
        purpose: tr(
            'VEX 123, çocukların teknolojiyle ilk tanışmasını güvenli ve eğlenceli bir şekilde gerçekleştirmek için tasarlanmıştır. Ekran kullanmadan, fiziksel kodlama kartlarıyla robotik kavramlarını öğretir ve erken yaşta STEM merakını ateşler.',
            'VEX 123 is designed to introduce children to technology in a safe and engaging way. It teaches robotics concepts through physical coding cards without screens and sparks early interest in STEM.'
        ),
        achievements: [
            tr('Temel kodlama ve algoritma mantığını kavrama', 'Understanding basic coding and algorithmic thinking'),
            tr('Problem çözme ve eleştirel düşünme', 'Problem solving and critical thinking'),
            tr('Sebep-sonuç ilişkisi kurma', 'Understanding cause-and-effect relationships'),
            tr('El göz koordinasyonu geliştirme', 'Developing hand-eye coordination'),
            tr('Takım çalışması ve iletişim becerileri', 'Teamwork and communication skills'),
            tr('Yaratıcı düşünme ve hayal gücü', 'Creative thinking and imagination')
        ],
        kitContents: [
            { name: tr('VEX 123 Robot', 'VEX 123 Robot'), description: tr('Şarj edilebilir, dayanıklı plastik robot', 'Rechargeable, durable plastic robot') },
            { name: tr('Coder Kartları', 'Coder Cards'), description: tr('40+ farklı komut kartı', '40+ different command cards') },
            { name: tr('Coder', 'Coder'), description: tr('Fiziksel programlama ünitesi', 'Physical programming unit') },
            { name: tr('Aktivite Alanı', 'Activity Area'), description: tr('Oyun ve görev haritaları', 'Game and task maps') },
            { name: tr('Öğretmen Kılavuzu', 'Teacher Guide'), description: tr('Ders planları ve aktiviteler', 'Lesson plans and activities') }
        ],
        competitionRules: []
    },

    'vex-go': {
        id: 'vex-go',
        name: 'VEX GO',
        fullName: tr('Uyumlu Eğitim Araçları: VEX GO', 'Compatible Education Tools: VEX GO'),
        tagline: tr('STEM keşfinin başlangıcı', 'The beginning of STEM discovery'),
        ageRange: tr('6-11 yaş', 'Ages 6-11'),
        color: '#00AEEF',
        secondaryColor: '#4FC3F7',
        icon: Gamepad2,
        description: tr(
            'VEX GO, ilkokul öğrencileri için tasarlanmış, snap-together yapı sistemi ve sezgisel kodlama platformudur. STEM kavramlarını somut deneyimlerle öğretir ve mühendislik tasarım sürecini tanıtır.',
            'VEX GO is a snap-together building system and intuitive coding platform designed for elementary students. It teaches STEM concepts through hands-on experiences and introduces the engineering design process.'
        ),
        purpose: tr(
            'VEX GO, öğrencilerin fen, teknoloji, mühendislik ve matematik kavramlarını hands-on aktivitelerle keşfetmesini sağlar. Modüler yapısı sayesinde öğrenciler kendi robotlarını tasarlar, inşa eder ve programlar.',
            'VEX GO enables students to explore science, technology, engineering, and mathematics through hands-on activities. Its modular system allows students to design, build, and program their own robots.'
        ),
        achievements: [
            tr('Temel mühendislik prensiplerini anlama', 'Understanding basic engineering principles'),
            tr('Blok tabanlı programlama becerileri', 'Block-based programming skills'),
            tr('Yapısal tasarım ve mekanik kavramlar', 'Structural design and mechanical concepts'),
            tr('Bilimsel düşünme ve deney yapma', 'Scientific thinking and experimentation'),
            tr('Takım içi işbirliği ve proje yönetimi', 'Team collaboration and project management'),
            tr('Sunum ve iletişim yetenekleri', 'Presentation and communication skills')
        ],
        kitContents: [
            { name: tr('GO Brain', 'GO Brain'), description: tr('Merkezi kontrol ünitesi', 'Central control unit') },
            { name: tr('GO Yapı Parçaları', 'GO Building Parts'), description: tr('250+ snap-together parça', '250+ snap-together parts') },
            { name: tr('Motorlar', 'Motors'), description: tr('2 adet akıllı motor', '2 smart motors') },
            { name: tr('Sensörler', 'Sensors'), description: tr('Göz sensörü ve LED ışıklar', 'Eye sensor and LED lights') },
            { name: tr('Şarj İstasyonu', 'Charging Station'), description: tr('Kablosuz şarj ünitesi', 'Wireless charging unit') }
        ],
        competitionRules: []
    },

    'engage': {
        id: 'engage',
        name: 'RECF Engage',
        fullName: tr('RECF Engage 2026–2027 Oyunu: Tier Takeover', 'RECF Engage 2026–2027 Game: Tier Takeover'),
        tagline: tr(
            'İlkokul ve ortaokul öğrencileri için yaratıcılık, takım çalışması ve mühendislik odaklı robotik yarışma programı.',
            'A robotics competition program focused on creativity, teamwork, and engineering for elementary and middle school students.'
        ),
        ageRange: tr('U12 ve U15', 'U12 and U15'),
        color: '#00A651',
        secondaryColor: '#7ED321',
        icon: Puzzle,
        description: tr(
            'RECF Engage, ilkokul ve ortaokul seviyesindeki öğrenciler için tasarlanmış, plastik yapı sistemine sahip yarışma robotik platformudur. Her yıl değişen oyun teması ile takım çalışması ve stratejik düşünmeyi teşvik eder.',
            'RECF Engage is a competitive robotics platform with a plastic construction system designed for elementary and middle school students. Its changing annual game themes encourage teamwork and strategic thinking.'
        ),
        purpose: tr(
            'RECF Engage, öğrencileri resmi yarışma ortamına hazırlar. Robotik mühendislik, programlama ve takım dinamikleri konularında derinlemesine deneyim sunar. Ulusal ve uluslararası yarışmalara katılım imkanı sağlar.',
            'RECF Engage prepares students for an official competition environment. It provides in-depth experience in robotics engineering, programming, and team dynamics, with opportunities to participate in national and international competitions.'
        ),
        achievements: [
            tr('Kapsamlı robotik mühendislik bilgisi', 'Comprehensive robotics engineering knowledge'),
            tr('Python ve blok tabanlı kodlama', 'Python and block-based coding'),
            tr('Stratejik düşünme ve oyun analizi', 'Strategic thinking and game analysis'),
            tr('Profesyonel takım yönetimi', 'Professional team management'),
            tr('Mühendislik defteri tutma alışkanlığı', 'Engineering notebook practices'),
            tr('Jüri önünde sunum yapabilme', 'Presenting before judges')
        ],
        kitContents: [
            { name: tr('Engage Robot Brain', 'Engage Robot Brain'), description: tr('Gelişmiş kontrol ünitesi', 'Advanced control unit') },
            { name: tr('Yapı Seti', 'Construction Kit'), description: tr('800+ plastik yapı parçası', '800+ plastic construction parts') },
            { name: tr('Akıllı Motorlar', 'Smart Motors'), description: tr('4 adet feedback motorları', '4 feedback motors') },
            { name: tr('Sensör Paketi', 'Sensor Package'), description: tr('Mesafe, dokunma, renk sensörleri', 'Distance, touch, and color sensors') },
            { name: tr('Kontroller', 'Controllers'), description: tr('Kablosuz kumanda sistemi', 'Wireless control system') },
            { name: tr('Yarışma Alanı', 'Competition Field'), description: tr('Resmi yarışma sahası elemanları', 'Official competition field elements') }
        ],
        competitionRules: [
            { title: tr('Alliance Matches', 'Alliance Matches'), description: tr('İki takım ittifak kurarak ortak hedeflere ulaşmaya ve maksimum puanı toplamaya çalışır.', 'Two teams form an alliance and work together to achieve shared objectives and score as many points as possible.') },
            { title: tr('Solo Driving', 'Solo Driving'), description: tr('Bireysel sürücü becerilerinin değerlendirildiği 60 saniyelik beceri maçları.', '60-second skills matches evaluating individual driving abilities.') },
            { title: tr('Solo Coding', 'Solo Coding'), description: tr('Otonom kodlama becerilerinin test edildiği bireysel görevler ve sıralamalar.', 'Individual tasks and rankings that test autonomous coding skills.') }
        ],
        gameSummary: {
            title: tr('RECF Engage 2026–2027 Oyunu: Tier Takeover', 'RECF Engage 2026–2027 Game: Tier Takeover'),
            description: tr(
                'Tier Takeover oyununda, takımlar robotlarını stratejik olarak yönlendirerek halkaları direklere yerleştirmeye ve bölge kontrolü sağlamaya çalışırlar. Maksimum puan için ittifak ortaklarıyla koordineli çalışmak esastır.',
                'In Tier Takeover, teams strategically control their robots to place rings on stakes and gain zone control. Coordination with alliance partners is essential for maximizing the score.'
            )
        },
        extraLinks: [
            { title: tr('Mühendislik Defteri', 'Engineering Notebook'), url: '/kaynaklar/teknik-belgeler' },
            { title: tr('Takım Kaydı', 'Team Registration'), url: '/takimlar/kayit' },
            { title: tr('Etkinlikler', 'Events'), url: '/yarismalar/etkinlik-takvimi' }
        ]
    },

    'achieve': {
        id: 'achieve',
        name: 'RECF Achieve',
        fullName: tr('RECF Achieve 2026–2027 Oyunu: Pinnacle', 'RECF Achieve 2026–2027 Game: Pinnacle'),
        tagline: tr(
            'Ortaokul ve lise öğrencileri için farklı yapı sistemleri ve özel üretim imkânları sunan ileri robotik programı.',
            'An advanced robotics program offering different construction systems and custom manufacturing opportunities for middle and high school students.'
        ),
        ageRange: tr('U15 ve U19', 'U15 and U19'),
        color: '#F7941D',
        secondaryColor: '#FFB85C',
        icon: Bot,
        description: tr(
            'RECF Achieve, lise ve ortaokul seviyesinde profesyonel metal robot yapımı ve ileri düzey programlama sunan robotik yarışma platformudur. Başarılı takımlar, RECF’nin güncel yeterlilik kurallarına göre RECF etkinlik yolunda ilerler.',
            'RECF Achieve is a robotics competition platform offering professional metal robot construction and advanced programming at the middle and high school levels. Successful teams progress through the RECF event pathway according to current RECF qualification rules.'
        ),
        purpose: tr(
            'RECF Achieve, öğrencileri gerçek mühendislik kariyerlerine hazırlar. Endüstriyel standartlarda metal işleme, ileri programlama dilleri ve profesyonel yarışma deneyimi sunar. Üniversite başvurularında güçlü bir portföy oluşturur.',
            'RECF Achieve prepares students for real engineering careers. It provides industrial-standard metalworking, advanced programming languages, and professional competition experience, helping students build strong portfolios for university applications.'
        ),
        achievements: [
            tr('Metal işleme ve endüstriyel tasarım', 'Metalworking and industrial design'),
            tr('C++ ve Python ile ileri programlama', 'Advanced programming with C++ and Python'),
            tr('Otonom robot sistemleri geliştirme', 'Developing autonomous robot systems'),
            tr('PID kontrol ve sensör füzyonu', 'PID control and sensor fusion'),
            tr('Proje yönetimi ve liderlik', 'Project management and leadership'),
            tr('Kapsamlı yarışma deneyimi', 'Extensive competition experience')
        ],
        kitContents: [
            { name: tr('V5 Robot Brain', 'V5 Robot Brain'), description: tr('ARM Cortex işlemcili ana ünite', 'Main unit with an ARM Cortex processor') },
            { name: tr('V5 Smart Motors', 'V5 Smart Motors'), description: tr('11W akıllı motorlar', '11W smart motors') },
            { name: tr('Metal Yapı Seti', 'Metal Construction Kit'), description: tr('Alüminyum C-channel ve plakalar', 'Aluminum C-channels and plates') },
            { name: tr('Elektronik Sistemler', 'Electronic Systems'), description: tr('İzin verilen tüm V5 elektronik donanımları', 'All permitted V5 electronic hardware') },
            { name: tr('Özel Üretim (Custom Parça)', 'Custom Manufacturing'), description: tr('Belirli kurallar çerçevesinde 3D baskı ve CNC özel plastik parça kullanımı', 'Use of 3D-printed and CNC-manufactured custom plastic parts within defined rules') },
            { name: tr('V5 Sensörler', 'V5 Sensors'), description: tr('Vision, GPS, IMU sensörleri', 'Vision, GPS, and IMU sensors') }
        ],
        competitionRules: [
            { title: tr('Alliance Matches', 'Alliance Matches'), description: tr('İkişer takımdan oluşan ittifakların karşılıklı veya işbirliği içinde mücadele ettiği karşılaşmalar.', 'Matches in which alliances consisting of two teams compete against each other or cooperate toward shared objectives.') },
            { title: tr('Solo Driving', 'Solo Driving'), description: tr('Takımların bireysel sürücü yeteneklerini sergilediği beceri maçları.', 'Skills matches where teams demonstrate individual driving abilities.') },
            { title: tr('Solo Coding', 'Solo Coding'), description: tr('Otonom programlama yetkinliğinin ölçüldüğü bağımsız beceri mücadeleleri.', 'Independent skills challenges measuring autonomous programming ability.') }
        ],
        gameSummary: {
            title: tr('RECF Achieve 2026–2027 Oyunu: Pinnacle', 'RECF Achieve 2026–2027 Game: Pinnacle'),
            description: tr(
                'Pinnacle oyunu, takımların çok katmanlı alanlarda hedef yapıları tamamlamasını, kritik noktalara tırmanmasını ve oyun süresi bitmeden maksimum zirve kontrolünü sağlamasını hedefler.',
                'The Pinnacle game challenges teams to complete target structures across multi-level areas, climb to critical points, and achieve maximum peak control before time expires.'
            )
        },
        extraLinks: [
            { title: tr('Mühendislik Defteri', 'Engineering Notebook'), url: '/kaynaklar/teknik-belgeler' },
            { title: tr('Takım Kaydı', 'Team Registration'), url: '/takimlar/kayit' },
            { title: tr('Etkinlikler', 'Events'), url: '/yarismalar/etkinlik-takvimi' }
        ]
    },

    'vex-ai': {
        id: 'vex-ai',
        name: 'VEX AI / Workcell',
        fullName: tr('Yapay Zekâ ve Endüstriyel Robotik Eğitim Çözümleri', 'AI and Industrial Robotics Education Solutions'),
        tagline: tr('Teknoloji Eğitimleri ve Laboratuvar Çözümleri', 'Technology Training and Laboratory Solutions'),
        ageRange: tr('14-18 yaş', 'Ages 14-18'),
        color: '#6B21A8',
        secondaryColor: '#A855F7',
        icon: Cpu,
        description: tr(
            'VEX AI ve V5 Workcell, yapay zeka, makine öğrenmesi ve endüstriyel otomasyon konularında uzmanlaşmak isteyen ileri düzey öğrenciler için tasarlanmış platformlardır.',
            'VEX AI and V5 Workcell are platforms designed for advanced students who want to specialize in artificial intelligence, machine learning, and industrial automation.'
        ),
        purpose: tr(
            'Bu platformlar, öğrencileri Endüstri 4.0 ve yapay zeka çağına hazırlar. Gerçek dünya otomasyon problemlerini çözme, AI algoritmaları geliştirme ve endüstriyel robot programlama deneyimi sunar.',
            'These platforms prepare students for Industry 4.0 and the age of artificial intelligence. They provide experience solving real-world automation problems, developing AI algorithms, and programming industrial robots.'
        ),
        achievements: [
            tr('Yapay zeka ve makine öğrenmesi temelleri', 'Fundamentals of artificial intelligence and machine learning'),
            tr('Bilgisayarlı görü (Computer Vision)', 'Computer vision'),
            tr('Endüstriyel robot kol programlama', 'Industrial robotic arm programming'),
            tr('Otomasyon hattı tasarımı', 'Automation line design'),
            tr('Veri analizi ve optimizasyon', 'Data analysis and optimization'),
            tr('Profesyonel mühendislik yazılımları', 'Professional engineering software')
        ],
        kitContents: [
            { name: tr('AI Jetson Nano', 'AI Jetson Nano'), description: tr('NVIDIA AI işlemci kartı', 'NVIDIA AI computing board') },
            { name: tr('AI Kamera', 'AI Camera'), description: tr('Stereo görüntü sistemi', 'Stereo vision system') },
            { name: tr('GPS Sensör', 'GPS Sensor'), description: tr('Hassas konum belirleme', 'Precise positioning') },
            { name: tr('Workcell Arm', 'Workcell Arm'), description: tr('5 eksenli robot kol', '5-axis robotic arm') },
            { name: tr('Konveyör Sistemi', 'Conveyor System'), description: tr('Malzeme taşıma bandı', 'Material handling conveyor') },
            { name: tr('AI Yazılım Paketi', 'AI Software Package'), description: tr('Python AI kütüphaneleri', 'Python AI libraries') }
        ],
        competitionRules: []
    },

    'inspire': {
        id: 'inspire',
        name: 'RECF Inspire',
        fullName: tr('RECF Inspire 2026–2027 Oyunu: Pinnacle', 'RECF Inspire 2026–2027 Game: Pinnacle'),
        tagline: tr(
            'Üniversite ve yükseköğretim öğrencileri için açık sistemler, özel tasarım ve iki robotlu takım yapısına sahip ileri mühendislik yarışması.',
            'An advanced engineering competition for university and higher-education students featuring open systems, custom design, and two-robot teams.'
        ),
        ageRange: tr('18+ yaş / Üniversite', 'Age 18+ / University'),
        color: '#E31837',
        secondaryColor: '#FF4D6D',
        icon: GraduationCap,
        description: tr(
            'RECF Inspire, üniversite öğrencileri için tasarlanmış, sınırsız tasarım özgürlüğü sunan elit robotik yarışma platformudur. Açık donanım (open hardware) ve özel üretim (custom manufacturing) seçenekleriyle ileri düzey mühendislik becerilerini test eder.',
            'RECF Inspire is an elite robotics competition platform designed for university students that offers extensive design freedom. It tests advanced engineering skills through open hardware and custom manufacturing options.'
        ),
        purpose: tr(
            'RECF Inspire, üniversite öğrencilerine gerçek mühendislik projelerinde çalışma fırsatı sunar. 3D baskı, CNC işleme ve endüstriyel sensör entegrasyonu gibi serbest üretim imkanlarıyla takımları profesyonel hayata hazırlar.',
            'RECF Inspire gives university students the opportunity to work on real engineering projects. Custom manufacturing options such as 3D printing, CNC machining, and industrial sensor integration prepare teams for professional engineering.'
        ),
        achievements: [
            tr('Sınırsız tasarım ve özel parça üretimi', 'Extensive design freedom and custom part manufacturing'),
            tr('İleri robot kinematiği ve dinamiği', 'Advanced robot kinematics and dynamics'),
            tr('Profesyonel yazılım geliştirme pratikleri', 'Professional software development practices'),
            tr('Akademik araştırma ve takım yönetimi', 'Academic research and team management'),
            tr('Endüstri bağlantıları ve staj fırsatları', 'Industry connections and internship opportunities'),
            tr('Uluslararası networking', 'International networking')
        ],
        kitContents: [
            { name: tr('Açık Sistemler', 'Open Systems'), description: tr('Genişletilebilir elektronik ve sensör ekosistemi', 'Extensible electronics and sensor ecosystem') },
            { name: tr('Özel Üretim (Custom)', 'Custom Manufacturing'), description: tr('Sınırsız 3D baskı ve işlenmiş parça özgürlüğü', 'Extensive freedom for 3D-printed and machined parts') },
            { name: tr('Endüstriyel Sensörler', 'Industrial Sensors'), description: tr('LiDAR, Intel RealSense ve özel sensör entegrasyonu', 'LiDAR, Intel RealSense, and custom sensor integration') },
            { name: tr('Gelişmiş İşlemciler', 'Advanced Processors'), description: tr('Raspberry Pi, Jetson Nano gibi yardımcı işlemci desteği', 'Support for auxiliary processors such as Raspberry Pi and Jetson Nano') }
        ],
        competitionRules: [
            { title: tr('İki Robotlu Sistem', 'Two-Robot System'), description: tr('Her takım, maçlara koordineli çalışan biri büyük diğeri küçük olmak üzere 2 farklı robotla katılır.', 'Each team competes with two coordinated robots, one larger and one smaller.') },
            { title: tr('Design Freedom', 'Design Freedom'), description: tr('Sınırsız tasarım özgürlüğü, açık donanım ve özel parça kullanımı serbesttir.', 'Extensive design freedom, open hardware, and custom parts are permitted.') },
            { title: tr('Head-to-Head Matches', 'Head-to-Head Matches'), description: tr('İki üniversite takımı karşılıklı olarak yarışır (1v1 takım formatı).', 'Two university teams compete directly against each other in a 1v1 team format.') }
        ],
        gameSummary: {
            title: tr('RECF Inspire 2026–2027 Oyunu: Pinnacle', 'RECF Inspire 2026–2027 Game: Pinnacle'),
            description: tr(
                'Pinnacle oyunu, takımların çok katmanlı alanlarda hedef yapıları tamamlamasını, kritik noktalara tırmanmasını ve oyun süresi bitmeden maksimum zirve kontrolünü sağlamasını hedefler.',
                'The Pinnacle game challenges teams to complete target structures across multi-level areas, climb to critical points, and achieve maximum peak control before time expires.'
            )
        },
        extraLinks: [
            { title: tr('Mühendislik Defteri', 'Engineering Notebook'), url: '/kaynaklar/teknik-belgeler' },
            { title: tr('Üniversite Takım Kaydı', 'University Team Registration'), url: '/takimlar/kayit' },
            { title: tr('Etkinlikler', 'Events'), url: '/yarismalar/etkinlik-takvimi' }
        ]
    },

    'adc': {
        id: 'adc',
        name: 'Aerial Drone Competition (ADC)',
        fullName: tr('Aerial Drone Competition (ADC)', 'Aerial Drone Competition (ADC)'),
        tagline: tr(
            'Gökyüzünün Geleceğini Tasarlayan Genç Mühendisler ve Pilotlar',
            'Young Engineers and Pilots Designing the Future of the Sky'
        ),
        ageRange: tr('Ortaokul ve Lise', 'Middle & High School'),
        color: '#00AEEF',
        secondaryColor: '#4FC3F7',
        icon: Gamepad2,
        description: tr(
            'STEM alanlarını destekleyen, otonom ve manuel drone uçuş becerilerini geliştiren eğitim yarışması.',
            'An educational competition supporting STEM fields and developing autonomous and manual drone flight skills.'
        ),
        purpose: tr(
            'Aerial Drone Competition, öğrencileri havacılık, uçuş dinamikleri ve otonom kodlama alanlarında geliştirmek için tasarlanmıştır. Gerçek dünya drone teknolojilerine zemin hazırlar.',
            'Aerial Drone Competition is designed to develop students in aviation, flight dynamics, and autonomous coding while preparing them for real-world drone technologies.'
        ),
        achievements: [
            tr('Gerçek dünya mühendislik problemleri çözme', 'Solving real-world engineering problems'),
            tr('Python/Blok tabanlı otonom kodlama', 'Python/block-based autonomous coding'),
            tr('Ulusal ve uluslararası turnuva deneyimi', 'National and international tournament experience')
        ],
        kitContents: [
            { name: tr('Uçuş Becerileri (Piloting Skills)', 'Piloting Skills'), description: tr('Manuel kontrol ve pilotaj becerilerinin geliştirilmesi', 'Developing manual control and piloting skills') },
            { name: tr('Otonom Kodlama (Autonomous Flight)', 'Autonomous Coding (Autonomous Flight)'), description: tr('Drone\'un otonom uçuş algoritmalarıyla görev yapması', 'Using autonomous flight algorithms to complete drone missions') },
            { name: tr('Mühendislik Defteri ve Takım Çalışması', 'Engineering Notebook and Teamwork'), description: tr('Tasarım ve süreç belgelerinin hazırlanması', 'Preparing design and process documentation') }
        ],
        competitionRules: [
            { title: tr('Kimler Katılabilir', 'Who Can Participate'), description: tr('Ortaokul ve Lise düzeyindeki öğrenci takımları, kulüpler ve bilim merkezleri.', 'Student teams, clubs, and science centers at the middle and high school levels.') }
        ],
        extraLinks: [
            { title: tr('Takımını Kur ve Kaydol', 'Build Your Team and Register'), url: '/takimlar/kayit' }
        ]
    },

    'adc-pro': {
        id: 'adc-pro',
        name: 'ADC Pro',
        fullName: tr('ADC Pro (Aerial Drone Competition Pro)', 'ADC Pro (Aerial Drone Competition Pro)'),
        tagline: tr(
            'İleri Seviye Otonom Drone Mühendisliği ve Karmaşık Görev Senaryoları',
            'Advanced Autonomous Drone Engineering and Complex Mission Scenarios'
        ),
        ageRange: tr('Lise İleri Düzey & Üniversite', 'Advanced High School & University'),
        color: '#6B21A8',
        secondaryColor: '#A855F7',
        icon: Cpu,
        description: tr(
            'İleri düzey otonom görevler, sensör entegrasyonu ve gerçek zamanlı veri işlemeye odaklanan ileri seviye drone yarışması.',
            'An advanced drone competition focused on autonomous missions, sensor integration, and real-time data processing.'
        ),
        purpose: tr(
            'ADC Pro, öğrencileri otonom havacılık mühendisliği ve yapay zeka tabanlı uçuş sistemlerine hazırlar. Çevre haritalama ve engel algılama gibi ileri algoritmalar test edilir.',
            'ADC Pro prepares students for autonomous aviation engineering and AI-based flight systems. Advanced algorithms such as environment mapping and obstacle detection are tested.'
        ),
        achievements: [
            tr('Yapay görme (Computer Vision) uygulamaları', 'Computer vision applications'),
            tr('Dinamik engel algılama ve SLAM', 'Dynamic obstacle detection and SLAM'),
            tr('Arama-kurtarma ve hassas iniş simülasyonları', 'Search-and-rescue and precision landing simulations')
        ],
        kitContents: [
            { name: tr('Hedef Kitle', 'Target Audience'), description: tr('Lise ileri düzey takımları, deneyimli ADC mezunları ve üniversite/gençlik kategorileri.', 'Advanced high school teams, experienced ADC alumni, and university/youth categories.') },
            { name: tr('Teknolojik Gereksinimler', 'Technology Requirements'), description: tr('Python / C++ ile gelişmiş sensör ve donanım entegrasyonu.', 'Advanced sensor and hardware integration using Python / C++.') }
        ],
        competitionRules: [
            { title: tr('Tamamen Otonom Uçuş', 'Fully Autonomous Flight'), description: tr('Drone\'ların hiçbir manuel müdahale olmadan sadece kendi yazılımlarıyla uçtuğu karşılaşmalar.', 'Matches in which drones fly using only their own software without manual intervention.') }
        ],
        extraLinks: [
            { title: tr('ADC Pro Başvuru ve Şartlar', 'ADC Pro Application and Requirements'), url: '/iletisim/form' }
        ]
    },

    'online-challenges': {
        id: 'online-challenges',
        name: 'Online Challenges',
        fullName: tr('RECF Online Challenges', 'RECF Online Challenges'),
        tagline: tr(
            'Çevrimiçi mühendislik, tasarım, CAD ve medya yarışmaları.',
            'Online engineering, design, CAD, and media competitions.'
        ),
        ageRange: tr('Tüm Seviyeler', 'All Levels'),
        color: '#1E3A8A',
        secondaryColor: '#3B82F6',
        icon: Factory,
        description: tr(
            'Öğrencilerin fiziksel robot yapımının ötesinde, tasarım, CAD çizimi, topluluk projeleri, video prodüksiyonu ve yazılım geliştirme gibi alanlarda projeler gönderdiği küresel yarışmalar.',
            'Global competitions where students submit projects beyond physical robot building, including design, CAD, community projects, video production, and software development.'
        ),
        purpose: tr(
            'Online Challenges, ekosistemdeki her öğrencinin kendi uzmanlık alanında (tasarım, yazılım, video, CAD vb.) küresel olarak rekabet etmesini ve portföy oluşturmasını amaçlar.',
            'Online Challenges aims to enable every student in the ecosystem to compete globally in their area of expertise, such as design, software, video, or CAD, while building a portfolio.'
        ),
        achievements: [
            tr('CAD ve 3D modelleme becerileri', 'CAD and 3D modeling skills'),
            tr('Multimedya, video kurgu ve iletişim', 'Multimedia, video editing, and communication'),
            tr('Bilimsel araştırma ve makale yazımı', 'Scientific research and academic writing'),
            tr('Toplumsal fayda ve STEM yaygınlaştırma projeleri', 'Community impact and STEM outreach projects'),
            tr('Web ve mobil uygulama geliştirme pratikleri', 'Web and mobile application development practices'),
            tr('Uluslararası değerlendirme ve geribildirim alma', 'Receiving international evaluation and feedback')
        ],
        kitContents: [
            { name: tr('CAD Yazılım Lisansları', 'CAD Software Licenses'), description: tr('Autodesk Fusion 360, SolidWorks gibi yazılımlara erişim', 'Access to software such as Autodesk Fusion 360 and SolidWorks') },
            { name: tr('Çevrimiçi Gönderim Portalı', 'Online Submission Portal'), description: tr('Projelerin yüklenip oylandığı resmi RECF platformu', 'Official RECF platform where projects are uploaded and voted on') }
        ],
        competitionRules: [
            { title: tr('Digital Submissions', 'Digital Submissions'), description: tr('Projeler tamamen dijital formatta hazırlanır ve belirlenen tarihlerde sisteme yüklenir.', 'Projects are prepared entirely in digital format and uploaded by the specified deadlines.') },
            { title: tr('Peer & Expert Review', 'Peer & Expert Review'), description: tr('Hem halk oylaması hem de RECF jürisi tarafından çift aşamalı değerlendirme yapılır.', 'Projects are evaluated in two stages through public voting and RECF judging.') },
            { title: tr('Global Awards', 'Global Awards'), description: tr('Dünya genelinde dereceye giren projelere doğrudan ödüller ve ödül puanları verilir.', 'Top projects worldwide receive direct awards and award points.') }
        ]
    }
}

const ui = {
    TR: {
        notFound: 'Program Bulunamadı',
        notFoundDescription: 'Aradığınız program mevcut değil.',
        backPrograms: 'Programlar sayfasına dön',
        programs: 'Programlar',
        purpose: 'Programın Amacı',
        why: 'Neden',
        achievements: 'Kazanımlar',
        studentsGain: 'Öğrenciler Ne Kazanır?',
        focus: 'Odak Alanları & Özellikler',
        included: 'Neler Dahil?',
        competitionDetails: 'Yarışma Detayları ve Odak Alanları',
        kitContents: 'Kit İçeriği',
        seasonGame: 'Sezon Oyunu',
        generalInfo: 'Genel Bilgiler',
        participationDetails: 'Katılım Detayları',
        competitionFormat: 'Yarışma Formatı',
        ready: 'ile Başlamaya Hazır mısınız?',
        ctaDescription: 'Takım kurma, kayıt ve eğitim programları hakkında bilgi alın.',
        buildTeam: 'Takım Nasıl Kurulur?',
        contact: 'İletişime Geç',
        vex123Warning: 'VEX 123, RECF Türkiye yarışma programları arasında yer almaz.',
        vexGoWarning: 'VEX GO, eğitim amaçlı kullanılabilen bir ürün grubudur; RECF Türkiye ana yarışma programı değildir.',
        vexAiWarning: 'VEX AI ve Workcell platformları, RECF yarışma programlarından ayrı, bağımsız eğitim ve laboratuvar çözümleridir.'
    },
    EN: {
        notFound: 'Program Not Found',
        notFoundDescription: 'The program you are looking for does not exist.',
        backPrograms: 'Back to Programs',
        programs: 'Programs',
        purpose: 'Program Purpose',
        why: 'Why',
        achievements: 'Learning Outcomes',
        studentsGain: 'What Will Students Gain?',
        focus: 'Focus Areas & Features',
        included: 'What’s Included?',
        competitionDetails: 'Competition Details & Focus Areas',
        kitContents: 'Kit Contents',
        seasonGame: 'Season Game',
        generalInfo: 'General Information',
        participationDetails: 'Participation Details',
        competitionFormat: 'Competition Format',
        ready: 'Ready to Get Started with',
        ctaDescription: 'Learn more about team building, registration, and education programs.',
        buildTeam: 'How to Build a Team',
        contact: 'Contact Us',
        vex123Warning: 'VEX 123 is not one of the RECF Türkiye competition programs.',
        vexGoWarning: 'VEX GO is an educational product line and is not an RECF Türkiye main competition program.',
        vexAiWarning: 'VEX AI and Workcell platforms are independent education and laboratory solutions separate from RECF competition programs.'
    }
}

export default function ProgramDetailPage() {
    const params = useParams()
    const programSlugRaw = params['program-adi'] as string
    const programSlug = slugMap[programSlugRaw] || programSlugRaw
    const { language, setLanguage } = useLanguage()

    const program = programsData[programSlug]
    const t = ui[language]

    if (!program) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-outfit">
                        {t.notFound}
                    </h1>
                    <p className="text-gray-600 mb-8">
                        {t.notFoundDescription}
                    </p>
                    <Link href="/programlar">
                        <Button className="bg-primary">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t.backPrograms}
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const Icon = program.icon

    return (
        <div className="min-h-screen bg-white text-foreground">

            <Navbar
                language={language}
                onLanguageToggle={() =>
                    setLanguage(l => l === 'TR' ? 'EN' : 'TR')
                }
                showTranslationWarning={language === 'EN'}
            />

            <div className="h-20" />

            {program.id === 'vex-123' && (
                <div className="bg-red-600 text-white text-center py-3 px-6 text-sm font-semibold">
                    {t.vex123Warning}
                </div>
            )}

            {program.id === 'vex-go' && (
                <div className="bg-red-600 text-white text-center py-3 px-6 text-sm font-semibold">
                    {t.vexGoWarning}
                </div>
            )}

            {program.id === 'vex-ai' && (
                <div className="bg-red-600 text-white text-center py-3 px-6 text-sm font-semibold">
                    {t.vexAiWarning}
                </div>
            )}

            {/* Hero */}
            <section
                className="relative py-20 md:py-28 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${program.color} 0%, ${program.secondaryColor} 100%)`
                }}
            >
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <Link
                            href="/programlar"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t.programs}
                        </Link>

                        <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Icon className="w-12 h-12 text-white" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-outfit">
                            {program.name}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 mb-2">
                            {program.tagline[language]}
                        </p>

                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                            {program.ageRange[language]}
                        </span>
                    </motion.div>

                </div>
            </section>

            {/* Description */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-600 leading-relaxed text-center"
                    >
                        {program.description[language]}
                    </motion.p>
                </div>
            </section>

            {/* Program Purpose */}
            <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                style={{
                                    backgroundColor: `${program.color}15`,
                                    color: program.color
                                }}
                            >
                                <Target className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {t.purpose}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-outfit">
                                {t.why} {program.name}?
                            </h2>

                            <p className="text-gray-600 leading-relaxed text-lg">
                                {program.purpose[language]}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div
                                className="aspect-square max-w-md mx-auto rounded-3xl flex items-center justify-center"
                                style={{
                                    backgroundColor: `${program.color}10`,
                                    border: `2px solid ${program.color}30`
                                }}
                            >
                                <Icon className="w-32 h-32 opacity-40 animate-pulse" />
                            </div>
                        </motion.div>

                    </div>

                </div>
            </section>

            {/* Achievements */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="text-center mb-12">

                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                            style={{
                                backgroundColor: `${program.color}15`,
                                color: program.color
                            }}
                        >
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {t.achievements}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-outfit">
                            {t.studentsGain}
                        </h2>

                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

                        {program.achievements.map((achievement, index) => (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        style={{ color: program.color }}
                                    />
                                    <span className="text-gray-700 font-semibold">
                                        {achievement[language]}
                                    </span>
                                </div>
                            </motion.div>

                        ))}

                    </div>

                </div>
            </section>

            {/* Kit / Focus Areas */}
            <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">

                    <div className="text-center mb-12">

                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                            style={{
                                backgroundColor: `${program.color}15`,
                                color: program.color
                            }}
                        >
                            <Package className="w-4 h-4" />

                            <span className="text-sm font-medium">
                                {program.id === 'adc' || program.id === 'adc-pro'
                                    ? t.focus
                                    : t.included}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-outfit">
                            {program.id === 'adc' || program.id === 'adc-pro'
                                ? t.competitionDetails
                                : t.kitContents}
                        </h2>

                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

                        {program.kitContents.map((item, index) => (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                            >

                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                    style={{
                                        backgroundColor: `${program.color}15`
                                    }}
                                >
                                    <Zap
                                        className="w-6 h-6"
                                        style={{ color: program.color }}
                                    />
                                </div>

                                <h3 className="font-bold text-gray-900 mb-1">
                                    {item.name[language]}
                                </h3>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.description[language]}
                                </p>

                            </motion.div>

                        ))}

                    </div>

                </div>
            </section>

            {/* Game Summary */}
            {program.gameSummary && (

                <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-200">

                    <div className="container mx-auto px-6 max-w-4xl text-center">

                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                            style={{
                                backgroundColor: `${program.color}15`,
                                color: program.color
                            }}
                        >
                            <Trophy className="w-4 h-4" />

                            <span className="text-sm font-medium">
                                {t.seasonGame}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-outfit">
                            {program.gameSummary.title[language]}
                        </h2>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            {program.gameSummary.description[language]}
                        </p>

                    </div>

                </section>

            )}

            {/* Competition Rules */}
            {program.competitionRules.length > 0 && (

                <section className="py-16 md:py-20 bg-white">

                    <div className="container mx-auto px-6 max-w-7xl">

                        <div className="text-center mb-12">

                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                                style={{
                                    backgroundColor: `${program.color}15`,
                                    color: program.color
                                }}
                            >
                                <Target className="w-4 h-4" />

                                <span className="text-sm font-medium">
                                    {t.generalInfo}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-outfit">
                                {program.id === 'adc' || program.id === 'adc-pro'
                                    ? t.participationDetails
                                    : t.competitionFormat}
                            </h2>

                        </div>

                        <div className="max-w-4xl mx-auto space-y-4">

                            {program.competitionRules.map((rule, index) => (

                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                    style={{
                                        borderLeftWidth: 4,
                                        borderLeftColor: program.color
                                    }}
                                >

                                    <h3 className="font-bold text-gray-900 mb-2">
                                        {rule.title[language]}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed">
                                        {rule.description[language]}
                                    </p>

                                </motion.div>

                            ))}

                        </div>

                    </div>

                </section>

            )}

            {/* CTA */}
            <section
                className="py-16 md:py-20"
                style={{
                    background: `linear-gradient(135deg, ${program.color} 0%, ${program.secondaryColor} 100%)`
                }}
            >

                <div className="container mx-auto px-6 max-w-4xl text-center text-white">

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-outfit">
                        {program.name} {t.ready}
                    </h2>

                    <p className="text-xl text-white/90 mb-8">
                        {t.ctaDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">

                        {program.extraLinks ? (

                            program.extraLinks.map((link, idx) => (

                                <Link key={idx} href={link.url}>

                                    <Button
                                        size="lg"
                                        className="bg-white hover:bg-gray-100 font-semibold px-8 shadow-lg"
                                        style={{ color: program.color }}
                                    >
                                        {link.title[language]}

                                        <ArrowRight className="w-4 h-4 ml-2 animate-bounce-horizontal" />
                                    </Button>

                                </Link>

                            ))

                        ) : (

                            <>
                                <Link href="/takimlar/nasil-kurulur">

                                    <Button
                                        size="lg"
                                        className="bg-white hover:bg-gray-100 font-semibold px-8 shadow-lg"
                                        style={{ color: program.color }}
                                    >
                                        {t.buildTeam}

                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>

                                </Link>

                                <Link href="/iletisim/form">

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-white text-white bg-white/5 hover:bg-white/20 backdrop-blur-sm font-semibold px-8"
                                    >
                                        {t.contact}
                                    </Button>

                                </Link>
                            </>

                        )}

                    </div>

                </div>

            </section>

            <Footer />

        </div>
    )
}
