# KaanChat

KaanChat, real-time bir chat uygulamasıdır. WebSocket teknolojisini kullanarak kullanıcıların birbirleriyle anlık mesajlaşmalarına imkan tanır. Proje, React frontend ve Spring Boot backend kullanılarak geliştirilmiştir. Ayrıca Spring Security ile güvenli kullanıcı girişi, şifre hashleme ve JWT tabanlı token yönetimi sağlanmaktadır.

## Özellikler

- **Anlık mesajlaşma**: Kullanıcılar, WebSocket ile anlık mesajlaşma yapabilirler.
- **Kullanıcı girişi ve çıkışı**: Kullanıcılar, güvenli bir şekilde giriş yapabilir ve çıkabilir.
- **Kayıt ve giriş işlemleri**: Kullanıcılar kayıt olabilir ve giriş yaparak sohbeti kullanmaya başlayabilirler.
- **JWT Token tabanlı kimlik doğrulama**: Kullanıcılar, giriş yaptıktan sonra 1 saat geçerli bir JWT token alır ve bu token ile chat uygulamasına erişebilirler.
- **Şifre güvenliği**: Kayıt sırasında kullanıcı şifresi hash'lenir ve veritabanında güvenli bir şekilde saklanır.
- **Responsive tasarım**: Uygulama tüm cihazlarda uyumlu olacak şekilde tasarlanmıştır.
- **Sistem mesajları**: Kullanıcı girişi, çıkışı ve diğer önemli sistem mesajları gösterilir.

## Teknolojiler

### Frontend
- React
- WebSocket (SockJS)
- CSS Modules (for styling)

### Backend
- Spring Boot
- Spring Security (JWT token tabanlı kimlik doğrulama)
- WebSocket (STOMP protokolü)
- Java 17
- Maven

## Spring Security & JWT

- **Şifre Hashleme**: Kayıt sırasında kullanıcı şifresi bcrypt ile güvenli bir şekilde hash'lenir.
- **JWT Token**: Kullanıcı login olduktan sonra 1 saat geçerli bir JWT token alır. Bu token, chat uygulamasına yapılan her istekte Authorization başlığıyla gönderilir.
  
### JWT Token Yenileme
- JWT token süresi dolduğunda, kullanıcı yeniden login olup yeni bir token alabilir. 
- Token yenileme sırasında kullanıcıya verilecek olan yeni token için, backend tarafında bir refresh token implementasyonu yapılabilir.

## Kurulum

### Backend Kurulumu
1. Bu repo'yu klonlayın:
   ```bash
   git clone https://github.com/kaanacikgoz/KaanChat.git
2. kaan-chat-backend dizinine gidin:
   ```bash
   cd kaan-chat-backend
3. Maven bağımlılıklarını yükleyin:
   ```bash
   mvn install
4. Spring Boot uygulamasını başlatın:
   ```bash
   mvn spring-boot:run
   
Backend, varsayılan olarak http://localhost:8080 üzerinde çalışacaktır.

### Frontend Kurulumu
1. kaan-chat-frontend dizinine gidin:
   ```bash
   cd kaan-chat-frontend
2. Npm bağımlılıklarını yükleyin:
   ```bash
   npm install
3. Frontend uygulamasını başlatın:
   ```bash
   npm run dev

Frontend, varsayılan olarak http://localhost:5173 üzerinde çalışacaktır.

## Kullanım
1. Uygulamayı başlattıktan sonra, kayıt olmak için gerekli bilgileri girin.
2. Kayıt olduktan sonra, giriş yaparak token alın.
3. Token, sadece login olduktan sonra geçerli olacak ve chat servisine erişimi sağlayacaktır.
4. Sohbet odasına katılabilir ve mesajlaşma işlemini gerçekleştirebilirsiniz.
5. Chat uygulaması sadece giriş yapan kullanıcılara açıktır.
