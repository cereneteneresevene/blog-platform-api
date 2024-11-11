# blog-platform-api
Bu proje, çok kullanıcılı bir blog platformu için RESTful API geliştirmeyi amaçlar. Sistem, kullanıcı kaydı, kullanıcı girişi, blog yazılarının oluşturulması, düzenlenmesi, silinmesi, yorum yapılması ve beğenilmesi gibi özellikleri destekleyecek. API üzerinden gerçekleştirilecek tüm operasyonlar Postman ile test edilebilecek.
Temel Özellikler:
•	Kullanıcı Kaydı ve Girişi: Kullanıcılar için kayıt ve giriş endpoint'leri. Kayıt sırasında e-posta doğrulaması gibi ek güvenlik önlemleri eklenebilir.
•	Kullanıcı Profili Yönetimi: Kullanıcılar kendi profillerini düzenleyebilir, profil resmi yükleyebilir.
•	Blog Yazıları Yönetimi: Kullanıcılar kendi blog yazılarını oluşturabilir, düzenleyebilir ve silebilir. Yazılara etiketler ekleyerek kategorilendirme yapılabilir.
•	Yorumlar ve Beğeniler: Kullanıcılar, blog yazılarına yorum yapabilir ve beğenebilir. Ayrıca yorumlara da yanıt verilebilir.
•	Arama ve Filtreleme: Yazılar, yazar, tarih, etiketler ve popülerlik gibi kriterlere göre aranabilir ve filtrelenebilir.

Teknik Detaylar:
•	Backend: Node.js ve Express.js.
•	Veritabanı: MongoDB ve Mongoose.
•	Kimlik Doğrulama ve Yetkilendirme: JWT tabanlı kimlik doğrulama ve yetkilendirme.
•	Dosya Yükleme: Blog yazılarına ve kullanıcı profillerine resim yüklemek için Multer gibi bir paket kullanılabilir.
•	Arama ve Filtreleme İşlemleri: MongoDB'nin gelişmiş sorgulama kapasiteleri kullanılabilir.


Geliştirme Adımları:
1.	Proje Kurulumu ve Bağımlılıkların Yüklenmesi: Express, Mongoose, JWT, Multer ve diğer gerekli npm paketlerini yükleyin.
2.	Veritabanı Modellerinin ve Schemalarının Oluşturulması: Kullanıcı, blog yazısı, yorum ve beğeni modelleri için MongoDB schemalarını tanımlayın.
3.	API Endpoint'lerinin Geliştirilmesi: Kullanıcı kaydı, girişi, blog yazısı yönetimi, yorum ve beğeni işlemleri için gerekli endpoint'leri geliştirin.
4.	Güvenlik ve Performans Optimizasyonları: CORS ayarları, veritabanı indekslemesi ve sorgu optimizasyonları yapın.
5.	Test: Postman kullanarak API'nizi kapsamlı bir şekilde test edin. Her işlev için başarılı ve hata durumlarına yönelik test senaryoları oluşturun.
