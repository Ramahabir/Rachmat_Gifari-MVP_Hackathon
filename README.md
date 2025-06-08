# SuryaOptiAI 🌞⚡

<div align="center">
  ![Image](https://github.com/user-attachments/assets/375df70c-c896-44ee-aaf7-487409a69555)
  
  **Sistem Monitoring dan Optimasi PLTS Berbasis AI dan IoT**
  
  *Mendukung Pemerataan Energi Bersih untuk Desa-desa di Indonesia*
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-surya--opti--ai.vercel.app-brightgreen)](https://surya-opti-ai.vercel.app/)
  [![Development](https://img.shields.io/badge/Development-Vercel-blue)](https://surya-opti-3wxji5p7b-rachmat-gifaris-projects.vercel.app/)
  [![Azure](https://img.shields.io/badge/Powered%20by-Microsoft%20Azure-0078d4)](https://azure.microsoft.com/)

</div>

## 📋 Deskripsi Proyek

SuryaOptiAI adalah solusi inovatif yang menggabungkan teknologi Artificial Intelligence (AI) dan Internet of Things (IoT) untuk memantau dan mengoptimalkan kinerja Pembangkit Listrik Tenaga Surya (PLTS). Proyek ini bertujuan untuk mendukung pemerataan akses energi bersih ke desa-desa terpencil di Indonesia melalui sistem monitoring cerdas yang dapat memprediksi, menganalisis, dan mengoptimalkan performa panel surya secara real-time.

## 🎯 Tujuan & Visi

- **Visi**: Mewujudkan Indonesia yang mandiri energi melalui optimasi PLTS berbasis AI
- **Misi**: 
  - Meningkatkan efisiensi PLTS di daerah terpencil
  - Menyediakan akses monitoring real-time yang mudah dipahami
  - Mengurangi biaya maintenance melalui predictive analytics
  - Mendukung program elektrifikasi nasional

## ✨ Fitur Utama

### 🤖 AI-Powered Analytics
- **Time-Series Forecasting**: Prediksi produksi energi berdasarkan data historis
- **Classification Models**: Identifikasi otomatis kondisi dan anomali sistem
- **Predictive Maintenance**: Deteksi dini kerusakan komponen
- **Performance Optimization**: Rekomendasi otomatis untuk peningkatan efisiensi

### 📊 Dashboard Monitoring
- **Real-time Monitoring**: Pantau performa PLTS secara langsung
- **Historical Data Analysis**: Analisis tren dan pola produksi energi
- **Interactive Visualizations**: Grafik dan chart yang mudah dipahami
- **Alert System**: Notifikasi otomatis untuk kondisi abnormal

### 🌐 IoT Integration
- **Remote Monitoring**: Akses data dari lokasi manapun
- **Multi-device Support**: Kompatibel dengan berbagai sensor IoT
- **Data Synchronization**: Sinkronisasi data real-time ke cloud
- **Scalable Architecture**: Mendukung multiple PLTS installations

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React.js**: Framework utama untuk web application
- **Tailwind CSS**: Styling dan responsive design
- **Chart.js/D3.js**: Visualisasi data interaktif
- **Vercel**: Platform deployment dan hosting

### Backend & AI
- **Microsoft Azure Machine Learning**: Time-series forecasting dan classification
- **Azure OpenAI**: Natural language processing dan intelligent insights
- **Azure IoT Hub**: Manajemen device dan data collection
- **Node.js/Express**: API server dan middleware

### Database & Storage
- **Azure Cosmos DB**: Database NoSQL untuk data IoT
- **Azure Blob Storage**: Penyimpanan file dan media
- **Time Series Database**: Optimized storage untuk data sensor

## 🚀 Live Demo

Kunjungi aplikasi SuryaOptiAI yang sudah berjalan:

- **Production**: [https://surya-opti-ai.vercel.app/](https://surya-opti-ai.vercel.app/)
- **Development**: [https://surya-opti-3wxji5p7b-rachmat-gifaris-projects.vercel.app/](https://surya-opti-3wxji5p7b-rachmat-gifaris-projects.vercel.app/)

## 📦 Instalasi dan Setup

### Prerequisites
```bash
Node.js >= 18.0.0
npm atau yarn
Azure Account (untuk AI services)
```

### Langkah Instalasi
```bash
# Clone repository
git clone https://github.com/Megumi-desu/Rachmat_Gifari-MVP_Hackathon.git
cd Rachmat_Gifari-MVP_Hackathon

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Configure Azure credentials
# Edit .env file dengan Azure keys Anda

# Run development server
npm run dev
```

### Environment Variables
```env
AZURE_OPENAI_API_KEY=your_openai_key
AZURE_ML_ENDPOINT=your_ml_endpoint
AZURE_IOT_CONNECTION_STRING=your_iot_connection
NEXT_PUBLIC_API_URL=your_api_url
```

## 📁 Struktur Proyek

```
SuryaOptiAI/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Next.js pages
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   └── styles/           # CSS dan styling
├── public/               # Static assets
├── docs/                 # Dokumentasi
├── tests/                # Unit tests
├── azure/                # Azure deployment configs
└── iot/                  # IoT device codes
```

## 🔧 Penggunaan

### Dashboard Monitoring
1. Akses web application melalui browser
2. Login dengan credentials yang telah disediakan
3. Pilih PLTS yang ingin dimonitor
4. Lihat real-time data dan analytics
5. Set up alerts dan notifications

### AI Predictions
1. Navigasi ke halaman "Predictions"
2. Pilih time range untuk forecasting
3. Sistem akan menampilkan prediksi produksi energi
4. Lihat confidence intervals dan accuracy metrics

### IoT Device Management
1. Akses halaman "Device Management"
2. Add new devices dengan device ID
3. Configure sensor parameters
4. Monitor device status dan connectivity

## 📈 Roadmap

### Phase 1: MVP (Current) ✅
- [x] Web application development
- [x] Basic monitoring dashboard
- [x] Azure AI integration setup
- [x] Deployment to Vercel

### Phase 2: AI Implementation (In Progress) 🔄
- [ ] Time-series forecasting model
- [ ] Anomaly detection system
- [ ] Predictive maintenance alerts
- [ ] Performance optimization recommendations

### Phase 3: IoT Integration (Planned) 📋
- [ ] IoT device firmware development
- [ ] Real-time data streaming
- [ ] Edge computing capabilities
- [ ] Mobile application

### Phase 4: Scale & Optimization (Future) 🎯
- [ ] Multi-tenant architecture
- [ ] Advanced analytics
- [ ] Machine learning model improvements
- [ ] Integration with national grid

## 🤝 Kontribusi

Kami menyambut kontribusi dari developer, peneliti, dan stakeholder energi terbarukan:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Tim Pengembang

**Rachmat Gifari**
- GitHub: [@Megumi-desu](https://github.com/Megumi-desu)
- Email: [rachmat.gifari@email.com](mailto:rachmat.gifari@email.com)

## 🏆 Hackathon Information

Proyek ini dikembangkan sebagai bagian dari **MVP Hackathon** dengan fokus pada:
- Sustainable Energy Solutions
- AI/ML Implementation
- IoT Integration
- Social Impact for Indonesia

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 🙏 Acknowledgments

- Microsoft Azure untuk platform AI/ML
- Vercel untuk hosting dan deployment
- Tim hackathon untuk dukungan dan feedback
- Komunitas open source untuk inspirasi dan resources

## 📚 Referensi

- [Azure Machine Learning Documentation](https://docs.microsoft.com/en-us/azure/machine-learning/)
- [IoT in Solar Energy Monitoring](https://www.researchgate.net/publication/solar-iot-monitoring)
- [Time Series Forecasting for Energy](https://www.sciencedirect.com/science/article/energy-forecasting)

---

<div align="center">
  <p><strong>🌞 Bersama Membangun Indonesia Mandiri Energi 🇮🇩</strong></p>
  <p>Made with ❤️ for Indonesian Villages</p>
</div>
