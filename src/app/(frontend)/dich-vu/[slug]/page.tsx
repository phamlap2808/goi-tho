import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  FiPhone, FiArrowLeft, FiCheckCircle, FiClock, FiShield,
  FiStar, FiMapPin, FiArrowRight, FiChevronDown,
} from 'react-icons/fi'

// Map service slug to hero image
const serviceImageMap: Record<string, string> = {
  'son-nha': '/access/anh-tri/5.jpg',
  'tho-moc': '/access/anh-thai/4.jpg',
  'noi-that': '/access/chi-thanh/1.jpg',
  'sua-dien': '/access/anh-thai/1.jpg',
  'sua-nuoc': '/access/nha-hang-sen/1.jpg',
  'cua-nhom-kinh': '/access/anh-hung/3.jpg',
  'chong-tham': '/access/anh-tri/1.jpg',
  'tho-ho': '/access/kfc-ha-noi/1.jpg',
  'may-lanh': '/access/anh-hung/1.jpg',
  'sua-may-giat': '/access/lixil/1.JPG',
  'sua-tu-lanh': '/access/nha-hang-sen/7.jpg',
  'tho-han': '/access/anh-hung-phu-nhuan/1.JPG',
  've-sinh-nha': '/access/anh-tri/8.jpg',
  'sua-khoa': '/access/anh-hung-phu-nhuan/3.JPG',
  'lap-dat-thiet-bi': '/access/lixil/3.JPG',
}

// Map service slug to gallery images
const serviceGalleryMap: Record<string, string[]> = {
  'sua-dien': ['/access/anh-thai/1.jpg', '/access/anh-thai/2.jpg', '/access/anh-thai/3.jpg', '/access/anh-thai/4.jpg'],
  'sua-nuoc': ['/access/nha-hang-sen/1.jpg', '/access/nha-hang-sen/2.jpg', '/access/nha-hang-sen/3.jpg', '/access/nha-hang-sen/4.jpg'],
  'son-nha': ['/access/anh-tri/5.jpg', '/access/anh-tri/6.jpg', '/access/anh-tri/7.jpg', '/access/anh-tri/8.jpg'],
  'tho-moc': ['/access/anh-thai/4.jpg', '/access/anh-hung/4.jpg', '/access/anh-hung/5.jpg', '/access/anh-kien/1.jpg'],
  'may-lanh': ['/access/anh-hung/1.jpg', '/access/anh-hung/2.jpg', '/access/anh-hung/3.jpg', '/access/anh-hung/5.jpg'],
  'chong-tham': ['/access/anh-tri/1.jpg', '/access/anh-tri/2.jpg', '/access/anh-tri/3.jpg', '/access/anh-tri/4.jpg'],
  'tho-han': ['/access/anh-hung-phu-nhuan/1.JPG', '/access/anh-hung-phu-nhuan/2.JPG', '/access/anh-hung-phu-nhuan/3.JPG', '/access/anh-hung-phu-nhuan/4.jpg'],
  've-sinh-nha': ['/access/anh-tri/8.jpg', '/access/anh-nam/1.JPG', '/access/anh-nam/2.JPG', '/access/anh-nam/3.JPG'],
}

// Comprehensive service detail data
const serviceDetails: Record<string, {
  longDescription: string
  features: string[]
  process: { title: string; desc: string }[]
  pricing: { item: string; price: string }[]
  faqs: { q: string; a: string }[]
  warranty: string
  responseTime: string
  rating: string
  completedJobs: string
}> = {
  'sua-dien': {
    longDescription: 'Dịch vụ sửa chữa điện dân dụng và công nghiệp chuyên nghiệp tại Hà Nội & TP.HCM. Đội ngũ thợ điện có chứng chỉ hành nghề, kinh nghiệm 5-15 năm, xử lý mọi sự cố từ đơn giản đến phức tạp. Sử dụng thiết bị đo kiểm chuyên dụng, vật tư chính hãng Panasonic, Schneider, Sino.',
    features: [
      'Sửa chập điện, rò rỉ điện, mất pha',
      'Thay thế ổ cắm, công tắc, cầu dao đúng chuẩn',
      'Lắp đặt hệ thống điện mới cho nhà xây, sửa',
      'Kéo dây điện ngầm, đi nổi an toàn',
      'Sửa bảng điện, tủ điện, aptomat',
      'Lắp đèn LED, đèn trang trí, đèn chiếu sáng',
      'Kiểm tra an toàn hệ thống điện định kỳ',
      'Sửa chữa điện công nghiệp, nhà xưởng',
    ],
    process: [
      { title: 'Tiếp nhận yêu cầu', desc: 'Gọi hotline hoặc đặt lịch qua website, mô tả sự cố' },
      { title: 'Thợ đến khảo sát', desc: 'Có mặt trong 30-60 phút tại khu vực nội thành' },
      { title: 'Chẩn đoán & báo giá', desc: 'Kiểm tra bằng thiết bị chuyên dụng, báo giá chi tiết' },
      { title: 'Tiến hành sửa chữa', desc: 'Thi công theo đúng quy chuẩn kỹ thuật điện' },
      { title: 'Kiểm tra & bàn giao', desc: 'Test lại toàn bộ hệ thống, vận hành thử' },
      { title: 'Bảo hành dài hạn', desc: 'Bảo hành 6-12 tháng cho mọi hạng mục sửa chữa' },
    ],
    pricing: [
      { item: 'Sửa ổ cắm, công tắc', price: '50.000 - 150.000đ' },
      { item: 'Thay cầu dao, aptomat', price: '150.000 - 350.000đ' },
      { item: 'Kéo dây điện (mỗi mét)', price: '15.000 - 30.000đ' },
      { item: 'Lắp đèn LED, đèn trần', price: '100.000 - 300.000đ' },
      { item: 'Sửa bảng điện, tủ điện', price: '200.000 - 500.000đ' },
      { item: 'Kiểm tra hệ thống điện', price: '200.000 - 400.000đ' },
    ],
    faqs: [
      { q: 'Thợ đến trong bao lâu?', a: 'Với khu vực nội thành Hà Nội & TP.HCM, thợ sẽ có mặt trong 30-60 phút sau khi xác nhận đơn.' },
      { q: 'Có cần cắt điện trước khi thợ đến không?', a: 'Nếu sự cố nguy hiểm (chập, cháy), bạn nên ngắt cầu dao tổng. Thợ sẽ xử lý an toàn khi đến.' },
      { q: 'Vật tư có chính hãng không?', a: 'Chúng tôi sử dụng vật tư chính hãng Panasonic, Schneider, Sino có tem bảo hành đầy đủ.' },
      { q: 'Bảo hành như thế nào?', a: 'Bảo hành 6-12 tháng cho công sửa chữa. Nếu lỗi do thi công, chúng tôi sửa miễn phí.' },
    ],
    warranty: '6-12 tháng',
    responseTime: '30-60 phút',
    rating: '4.9/5',
    completedJobs: '2,500+',
  },
  'sua-nuoc': {
    longDescription: 'Dịch vụ sửa chữa hệ thống nước toàn diện: ống nước, vòi nước, bồn cầu, bình nóng lạnh, máy bơm. Thợ lành nghề với kinh nghiệm xử lý mọi sự cố từ rò rỉ nhỏ đến lắp đặt hệ thống cấp thoát nước hoàn chỉnh. Phục vụ cả nhà ở và công trình thương mại.',
    features: [
      'Sửa ống nước bị rò rỉ, tắc nghẽn, vỡ ống',
      'Thay vòi nước, lavabo, bồn cầu TOTO, INAX',
      'Sửa & lắp bình nóng lạnh Ariston, Ferroli',
      'Lắp đặt hệ thống cấp thoát nước hoàn chỉnh',
      'Xử lý tắc cống, thông tắc bồn cầu',
      'Lắp máy lọc nước RO, máy bơm tăng áp',
      'Sửa chữa van nước, đồng hồ nước',
      'Lắp đặt bồn nước inox, bồn nhựa trên mái',
    ],
    process: [
      { title: 'Gọi hotline / đặt lịch', desc: 'Mô tả sự cố: rò nước, tắc, hỏng thiết bị...' },
      { title: 'Thợ đến trong 30 phút', desc: 'Đội ngũ thợ gần nhất sẽ di chuyển đến ngay' },
      { title: 'Kiểm tra & báo giá', desc: 'Xác định nguyên nhân, báo giá trước khi làm' },
      { title: 'Sửa chữa tại chỗ', desc: 'Mang đầy đủ dụng cụ & phụ kiện thay thế' },
      { title: 'Vận hành thử', desc: 'Kiểm tra không rò rỉ, áp lực nước đạt chuẩn' },
      { title: 'Bảo hành cam kết', desc: 'Bảo hành 6-12 tháng tùy hạng mục' },
    ],
    pricing: [
      { item: 'Thay vòi nước, lavabo', price: '100.000 - 250.000đ' },
      { item: 'Sửa rò rỉ ống nước', price: '150.000 - 400.000đ' },
      { item: 'Thông tắc bồn cầu', price: '150.000 - 300.000đ' },
      { item: 'Thông cống thoát nước', price: '200.000 - 500.000đ' },
      { item: 'Lắp bình nóng lạnh', price: '200.000 - 400.000đ' },
      { item: 'Thay phao bồn cầu', price: '100.000 - 200.000đ' },
    ],
    faqs: [
      { q: 'Bị tắc cống nặng có sửa được không?', a: 'Có. Chúng tôi có máy thông cống chuyên dụng, xử lý mọi loại tắc nghẽn kể cả tắc sâu.' },
      { q: 'Thay bồn cầu mất bao lâu?', a: 'Thời gian thay bồn cầu mới khoảng 1-2 giờ tùy vị trí lắp đặt và loại bồn cầu.' },
      { q: 'Có sửa được bình nóng lạnh không?', a: 'Có, chúng tôi sửa chữa tất cả các hãng: Ariston, Ferroli, Panasonic, Midea...' },
      { q: 'Chi phí có phát sinh không?', a: 'Không. Thợ báo giá chi tiết trước khi làm. Không phát sinh bất kỳ chi phí ẩn nào.' },
    ],
    warranty: '6-12 tháng',
    responseTime: '30 phút',
    rating: '4.8/5',
    completedJobs: '3,200+',
  },
  'son-nha': {
    longDescription: 'Dịch vụ sơn nhà chuyên nghiệp: sơn mới, sơn sửa, sơn lại toàn bộ nhà. Sử dụng sơn cao cấp từ Dulux, Jotun, Nippon có bảo hành. Đội ngũ thợ sơn lành nghề, thi công sạch sẽ, đúng tiến độ. Tư vấn phối màu miễn phí theo phong cách nội thất.',
    features: [
      'Sơn nhà mới toàn bộ nội thất & ngoại thất',
      'Sơn sửa lại tường cũ bong tróc, ố vàng',
      'Chống thấm tường trước khi sơn',
      'Sơn trang trí, sơn hoa văn, sơn giả đá',
      'Sơn sắt, cửa gỗ, lan can, hàng rào',
      'Bả matit, xử lý bề mặt chuyên nghiệp',
      'Tư vấn phối màu, chọn loại sơn phù hợp',
      'Sử dụng sơn Dulux, Jotun, Nippon chính hãng',
    ],
    process: [
      { title: 'Khảo sát miễn phí', desc: 'Thợ đến tận nơi đo diện tích, đánh giá hiện trạng' },
      { title: 'Tư vấn & phối màu', desc: 'Gợi ý phối màu sang trọng phù hợp không gian' },
      { title: 'Báo giá theo m²', desc: 'Giá trọn gói bao gồm sơn + công + vật tư phụ' },
      { title: 'Chuẩn bị bề mặt', desc: 'Cạo sơn cũ, bả matit, xử lý nứt, chống thấm' },
      { title: 'Sơn 2-3 lớp chuẩn', desc: 'Sơn lót + 2 lớp sơn phủ theo quy chuẩn nhà sản xuất' },
      { title: 'Nghiệm thu & bảo hành', desc: 'Kiểm tra chất lượng, dọn dẹp sạch, bảo hành 2 năm' },
    ],
    pricing: [
      { item: 'Sơn nội thất (m²)', price: '25.000 - 45.000đ' },
      { item: 'Sơn ngoại thất (m²)', price: '35.000 - 55.000đ' },
      { item: 'Bả matit (m²)', price: '20.000 - 30.000đ' },
      { item: 'Sơn chống thấm (m²)', price: '40.000 - 70.000đ' },
      { item: 'Sơn cửa sắt, lan can', price: '80.000 - 150.000đ/cái' },
      { item: 'Sơn trần nhà (m²)', price: '30.000 - 50.000đ' },
    ],
    faqs: [
      { q: 'Sơn nhà mất bao lâu?', a: 'Căn hộ 2-3 phòng ngủ mất khoảng 3-5 ngày. Nhà phố 3-4 tầng mất 7-10 ngày tùy diện tích.' },
      { q: 'Có cần phải dọn đồ đạc không?', a: 'Thợ sẽ che phủ đồ đạc bằng ni-lông chuyên dụng. Bạn chỉ cần cất đồ giá trị nhỏ.' },
      { q: 'Dùng loại sơn nào?', a: 'Sơn Dulux, Jotun, Nippon chính hãng. Bạn cũng có thể tự chọn hãng sơn yêu thích.' },
      { q: 'Bảo hành bao lâu?', a: 'Bảo hành 2 năm cho công sơn. Ngoài ra, sơn Dulux, Jotun có bảo hành thêm từ nhà sản xuất.' },
    ],
    warranty: '2 năm',
    responseTime: 'Khảo sát trong 24h',
    rating: '4.9/5',
    completedJobs: '1,800+',
  },
  'tho-moc': {
    longDescription: 'Dịch vụ thợ mộc chuyên nghiệp: đóng tủ bếp, tủ quần áo, kệ sách, sửa cửa gỗ, lắp sàn gỗ. Sử dụng gỗ công nghiệp MDF, HDF, gỗ tự nhiên chất lượng cao. Thiết kế theo yêu cầu, thi công tại xưởng và tại nhà.',
    features: [
      'Đóng tủ bếp gỗ công nghiệp & tự nhiên',
      'Đóng tủ quần áo, tủ giày, tủ trang trí',
      'Làm kệ sách, kệ tivi, kệ trang trí',
      'Sửa cửa gỗ, cửa sổ gỗ bị hỏng',
      'Lắp sàn gỗ, ốp tường gỗ',
      'Làm bàn, ghế, giường theo yêu cầu',
      'Sửa chữa nội thất gỗ các loại',
      'Tư vấn thiết kế nội thất gỗ hiện đại',
    ],
    process: [
      { title: 'Tiếp nhận yêu cầu', desc: 'Trao đổi về nhu cầu, phong cách, ngân sách' },
      { title: 'Đo đạc & thiết kế', desc: 'Đến tận nơi đo kích thước, vẽ bản thiết kế 3D' },
      { title: 'Báo giá chi tiết', desc: 'Giá nguyên vật liệu + công thợ rõ ràng' },
      { title: 'Thi công', desc: 'Sản xuất tại xưởng hoặc thi công tại nhà' },
      { title: 'Lắp đặt hoàn thiện', desc: 'Vận chuyển, lắp đặt, căn chỉnh hoàn hảo' },
      { title: 'Bảo hành 12 tháng', desc: 'Bảo hành cong vênh, bung keo, hỏng phụ kiện' },
    ],
    pricing: [
      { item: 'Tủ bếp gỗ công nghiệp', price: '2.500.000 - 5.000.000đ/m dài' },
      { item: 'Tủ quần áo 3 cánh', price: '4.000.000 - 8.000.000đ' },
      { item: 'Kệ sách, kệ tivi', price: '1.500.000 - 3.500.000đ' },
      { item: 'Sửa cửa gỗ', price: '200.000 - 500.000đ' },
      { item: 'Lắp sàn gỗ (m²)', price: '180.000 - 350.000đ' },
      { item: 'Bàn làm việc', price: '1.000.000 - 2.500.000đ' },
    ],
    faqs: [
      { q: 'Dùng loại gỗ nào?', a: 'Tùy ngân sách: MDF, MFC, HDF (phổ thông), gỗ tự nhiên như sồi, ash, xoan đào (cao cấp).' },
      { q: 'Đóng tủ bếp mất bao lâu?', a: 'Khoảng 7-15 ngày từ khi xác nhận thiết kế đến hoàn thiện lắp đặt.' },
      { q: 'Có thiết kế 3D không?', a: 'Có, miễn phí bản thiết kế 3D để bạn hình dung trước khi thi công.' },
      { q: 'Gỗ có bị cong vênh không?', a: 'Chúng tôi sử dụng gỗ đã qua xử lý chống ẩm. Bảo hành 12 tháng nếu bị cong vênh.' },
    ],
    warranty: '12 tháng',
    responseTime: 'Khảo sát trong 24h',
    rating: '4.9/5',
    completedJobs: '1,500+',
  },
  'may-lanh': {
    longDescription: 'Dịch vụ vệ sinh, bảo trì và sửa chữa máy lạnh (điều hòa) tất cả các hãng: Daikin, Panasonic, LG, Samsung, Midea, Casper, Toshiba. Thợ có chứng chỉ kỹ thuật, trang bị máy đo gas, đồng hồ đo áp suất chuyên dụng.',
    features: [
      'Vệ sinh máy lạnh tận nơi, sạch 99%',
      'Sửa máy lạnh không lạnh, chảy nước',
      'Bơm gas máy lạnh R32, R410A, R22',
      'Thay board, cảm biến, quạt dàn lạnh/nóng',
      'Lắp đặt máy lạnh mới các loại',
      'Bảo dưỡng định kỳ cho văn phòng, cửa hàng',
      'Sửa máy lạnh công nghiệp, multi',
      'Di dời máy lạnh khi chuyển nhà',
    ],
    process: [
      { title: 'Đặt lịch vệ sinh/sửa', desc: 'Gọi hotline, chọn thời gian phù hợp' },
      { title: 'Thợ đến đúng giờ', desc: 'Mang đầy đủ dụng cụ, hóa chất vệ sinh' },
      { title: 'Kiểm tra & chẩn đoán', desc: 'Đo gas, kiểm tra board, dàn nóng/lạnh' },
      { title: 'Báo giá trước khi làm', desc: 'Không phát sinh, khách đồng ý mới tiến hành' },
      { title: 'Vệ sinh / sửa chữa', desc: 'Tháo rời, vệ sinh sâu hoặc thay linh kiện' },
      { title: 'Chạy thử & bảo hành', desc: 'Kiểm tra nhiệt độ, luồng gió, bảo hành 3-6 tháng' },
    ],
    pricing: [
      { item: 'Vệ sinh máy lạnh (1 cục)', price: '150.000 - 250.000đ' },
      { item: 'Bơm gas R32/R410A', price: '250.000 - 500.000đ' },
      { item: 'Thay board mạch', price: '400.000 - 800.000đ' },
      { item: 'Thay cảm biến', price: '150.000 - 300.000đ' },
      { item: 'Lắp đặt máy lạnh mới', price: '400.000 - 800.000đ' },
      { item: 'Di dời máy lạnh', price: '300.000 - 600.000đ' },
    ],
    faqs: [
      { q: 'Bao lâu nên vệ sinh máy lạnh?', a: 'Nên vệ sinh máy lạnh 3-6 tháng/lần để đảm bảo hiệu quả làm mát và tiết kiệm điện.' },
      { q: 'Máy lạnh không lạnh do gì?', a: 'Có nhiều nguyên nhân: thiếu gas, tắc dàn lạnh, hỏng board, quạt yếu... Thợ sẽ kiểm tra chính xác.' },
      { q: 'Có sửa được máy lạnh inverter?', a: 'Có, thợ chuyên môn cao, xử lý được cả máy lạnh inverter, multi, và VRV công nghiệp.' },
      { q: 'Vệ sinh máy lạnh mất bao lâu?', a: 'Khoảng 30-45 phút cho 1 máy. Vệ sinh sâu (tháo dàn) khoảng 60-90 phút.' },
    ],
    warranty: '3-6 tháng',
    responseTime: '30-60 phút',
    rating: '4.8/5',
    completedJobs: '4,500+',
  },
  'chong-tham': {
    longDescription: 'Dịch vụ chống thấm chuyên nghiệp: sân thượng, tường ngoài, nhà vệ sinh, tầng hầm. Sử dụng vật liệu Sika, Kova, Flinkote hàng đầu thế giới. Đội ngũ thợ giàu kinh nghiệm, bảo hành dài hạn 3-5 năm.',
    features: [
      'Chống thấm sân thượng, mái bằng',
      'Chống thấm tường ngoài, tường ngăn',
      'Chống thấm nhà vệ sinh, phòng tắm',
      'Chống thấm tầng hầm, hố thang máy',
      'Xử lý nứt tường, trần nhà bị thấm',
      'Chống thấm ban công, lô gia',
      'Sử dụng vật liệu Sika, Kova, Flinkote',
      'Bảo hành lên đến 5 năm',
    ],
    process: [
      { title: 'Khảo sát thấm dột', desc: 'Xác định chính xác vị trí và mức độ thấm' },
      { title: 'Tìm nguyên nhân gốc', desc: 'Kiểm tra kết cấu, mối nối, đường ống' },
      { title: 'Đề xuất giải pháp', desc: 'Phương án xử lý tối ưu, tiết kiệm nhất' },
      { title: 'Thi công chống thấm', desc: 'Áp dụng kỹ thuật chống thấm đa lớp' },
      { title: 'Test tưới nước', desc: 'Kiểm tra bằng phương pháp ngâm nước 24-48h' },
      { title: 'Bảo hành 3-5 năm', desc: 'Cam kết không thấm lại trong thời gian BH' },
    ],
    pricing: [
      { item: 'Chống thấm sân thượng (m²)', price: '120.000 - 250.000đ' },
      { item: 'Chống thấm nhà vệ sinh (m²)', price: '150.000 - 300.000đ' },
      { item: 'Chống thấm tường (m²)', price: '100.000 - 200.000đ' },
      { item: 'Xử lý nứt tường (m dài)', price: '80.000 - 150.000đ' },
      { item: 'Chống thấm tầng hầm (m²)', price: '200.000 - 400.000đ' },
      { item: 'Chống thấm ban công (m²)', price: '120.000 - 220.000đ' },
    ],
    faqs: [
      { q: 'Chống thấm mất bao lâu?', a: 'Tùy diện tích: sân thượng 20-30m² mất 2-3 ngày, nhà vệ sinh mất 1-2 ngày.' },
      { q: 'Nhà đang ở có làm được không?', a: 'Được. Với nhà vệ sinh, cần tạm ngưng sử dụng 2-3 ngày. Sân thượng không ảnh hưởng sinh hoạt.' },
      { q: 'Vật liệu nào tốt nhất?', a: 'Sika (Thụy Sĩ) là hàng đầu thế giới. Kova, Flinkote là lựa chọn chất lượng với giá hợp lý hơn.' },
      { q: 'Bảo hành thế nào nếu thấm lại?', a: 'Nếu thấm lại trong thời gian bảo hành, chúng tôi xử lý lại hoàn toàn miễn phí.' },
    ],
    warranty: '3-5 năm',
    responseTime: 'Khảo sát trong 24h',
    rating: '4.9/5',
    completedJobs: '1,200+',
  },
}

const defaultDetail = {
  longDescription: 'Dịch vụ sửa chữa chuyên nghiệp tại Hà Nội & TP. Hồ Chí Minh. Đội ngũ thợ lành nghề, kinh nghiệm lâu năm, sử dụng vật tư chính hãng. Cam kết chất lượng, bảo hành dài hạn, giá cả minh bạch.',
  features: [
    'Thi công chuyên nghiệp, đúng kỹ thuật',
    'Thợ lành nghề, kinh nghiệm 5+ năm',
    'Vật tư chính hãng, có tem bảo hành',
    'Bảo hành dài hạn từ 6-12 tháng',
    'Giá cả hợp lý, báo giá minh bạch',
    'Phục vụ tận nơi, đúng giờ hẹn',
    'Dọn dẹp sạch sẽ sau thi công',
    'Hỗ trợ tư vấn miễn phí trước khi làm',
  ],
  process: [
    { title: 'Tiếp nhận yêu cầu', desc: 'Gọi hotline hoặc đặt lịch qua website' },
    { title: 'Thợ đến khảo sát', desc: 'Có mặt trong 30-60 phút tại nội thành' },
    { title: 'Báo giá chi tiết', desc: 'Giá trọn gói, không phát sinh ẩn' },
    { title: 'Tiến hành sửa chữa', desc: 'Thi công nhanh gọn, chuyên nghiệp' },
    { title: 'Kiểm tra & bàn giao', desc: 'Test vận hành, đảm bảo hoàn hảo' },
    { title: 'Bảo hành cam kết', desc: 'Bảo hành 6-12 tháng cho mọi hạng mục' },
  ],
  pricing: [
    { item: 'Kiểm tra & tư vấn', price: 'Miễn phí' },
    { item: 'Sửa chữa nhỏ', price: '100.000 - 300.000đ' },
    { item: 'Sửa chữa vừa', price: '300.000 - 800.000đ' },
    { item: 'Sửa chữa lớn', price: 'Báo giá theo khối lượng' },
    { item: 'Lắp đặt mới', price: 'Theo báo giá' },
    { item: 'Bảo trì định kỳ', price: 'Liên hệ tư vấn' },
  ],
  faqs: [
    { q: 'Thợ đến trong bao lâu?', a: 'Trong 30-60 phút cho khu vực nội thành Hà Nội & TP.HCM.' },
    { q: 'Có bảo hành không?', a: 'Có bảo hành 6-12 tháng cho tất cả các hạng mục sửa chữa.' },
    { q: 'Giá có phát sinh không?', a: 'Không. Thợ báo giá chi tiết trước khi làm, đảm bảo minh bạch.' },
    { q: 'Có làm ngoài giờ không?', a: 'Có. Chúng tôi hỗ trợ sửa chữa khẩn cấp 24/7 cho các sự cố cấp bách.' },
  ],
  warranty: '6-12 tháng',
  responseTime: '30-60 phút',
  rating: '4.8/5',
  completedJobs: '800+',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    const service = result.docs[0]
    if (service) {
      return {
        title: `Dịch Vụ ${service.title} Uy Tín, Chuyên Nghiệp | GoiTho.com`,
        description: `${service.description} Phục vụ tại Hà Nội & TP.HCM. Thợ lành nghề, bảo hành dài hạn. Gọi ngay 024 73 088 088.`,
      }
    }
  } catch {}

  return { title: 'Dịch vụ | GoiTho.com', description: 'Dịch vụ sửa chữa nhà chuyên nghiệp' }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let service: any = null
  try {
    const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
    service = result.docs[0]
  } catch {}

  if (!service) notFound()

  const detail = serviceDetails[slug] || defaultDetail
  const heroImage = serviceImageMap[slug]
  const gallery = serviceGalleryMap[slug] || []

  // Fetch other services for related section
  let otherServices: any[] = []
  try {
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
    otherServices = result.docs.filter((s: any) => s.slug !== slug).slice(0, 6)
  } catch {}

  return (
    <>
      {/* HERO BANNER with image */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          {heroImage && (
            <Image
              src={heroImage}
              alt={`Dịch vụ ${service.title} - GoiTho.com`}
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
          <div className="sd-hero-overlay" />
        </div>
        <div className="container sd-hero-content">
          {/* Breadcrumb */}
          <nav className="sd-breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span>/</span>
            <Link href="/dich-vu">Dịch vụ</Link>
            <span>/</span>
            <span>{service.title}</span>
          </nav>

          <h1>Dịch Vụ {service.title}</h1>
          <p className="sd-hero-desc">{detail.longDescription || service.description}</p>

          {/* Quick stats */}
          <div className="sd-hero-stats">
            <div className="sd-stat">
              <FiClock />
              <div>
                <strong>{detail.responseTime}</strong>
                <span>Thời gian phản hồi</span>
              </div>
            </div>
            <div className="sd-stat">
              <FiStar />
              <div>
                <strong>{detail.rating}</strong>
                <span>Đánh giá</span>
              </div>
            </div>
            <div className="sd-stat">
              <FiShield />
              <div>
                <strong>{detail.warranty}</strong>
                <span>Bảo hành</span>
              </div>
            </div>
            <div className="sd-stat">
              <FiCheckCircle />
              <div>
                <strong>{detail.completedJobs}</strong>
                <span>Công trình</span>
              </div>
            </div>
          </div>

          <div className="sd-hero-actions">
            <Link href="/dat-lich" className="btn btn-primary btn-lg">
              <FiPhone /> Đặt lịch ngay
            </Link>
            <a href="tel:02473088088" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
              <FiPhone /> 024 73 088 088
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES - What we do */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Dịch vụ {service.title} bao gồm</h2>
            <p>Những công việc chuyên môn chúng tôi có thể hỗ trợ bạn</p>
          </div>
          <div className="sd-features-grid">
            {detail.features.map((f, i) => (
              <div key={i} className="sd-feature-item">
                <div className="sd-feature-check"><FiCheckCircle /></div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY - Work samples */}
      {gallery.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2>Hình ảnh thi công thực tế</h2>
              <p>Một số công trình {service.title.toLowerCase()} tiêu biểu</p>
            </div>
            <div className="sd-gallery-grid">
              {gallery.map((src, i) => (
                <div key={i} className="sd-gallery-item">
                  <Image
                    src={src}
                    alt={`${service.title} - Hình ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS - How we work */}
      <section className={`section ${gallery.length > 0 ? '' : 'section-alt'}`}>
        <div className="container">
          <div className="section-header">
            <h2>Quy trình làm việc</h2>
            <p>6 bước đơn giản, chuyên nghiệp từ tiếp nhận đến bảo hành</p>
          </div>
          <div className="sd-process-grid">
            {detail.process.map((step, i) => (
              <div key={i} className="sd-process-step">
                <div className="sd-process-number">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Bảng giá tham khảo</h2>
            <p>Giá chưa bao gồm vật tư (nếu cần thay). Báo giá chính xác sau khảo sát.</p>
          </div>
          <div className="sd-pricing-wrapper">
            <table className="sd-pricing-table">
              <thead>
                <tr>
                  <th>Hạng mục</th>
                  <th>Giá tham khảo</th>
                </tr>
              </thead>
              <tbody>
                {detail.pricing.map((item, i) => (
                  <tr key={i}>
                    <td>{item.item}</td>
                    <td className="sd-price">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="sd-pricing-note">
              * Giá trên chỉ mang tính tham khảo. Giá thực tế sẽ được báo giá chính xác sau khi thợ khảo sát tại nhà. Cam kết không phát sinh chi phí ẩn.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Câu hỏi thường gặp</h2>
            <p>Giải đáp thắc mắc về dịch vụ {service.title.toLowerCase()}</p>
          </div>
          <div className="sd-faq-list">
            {detail.faqs.map((faq, i) => (
              <details key={i} className="sd-faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <FiChevronDown className="sd-faq-icon" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {otherServices.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Dịch vụ liên quan</h2>
              <p>Có thể bạn cũng cần</p>
            </div>
            <div className="services-grid">
              {otherServices.map((s: any, i: number) => {
                const imgSrc = serviceImageMap[s.slug]
                return (
                  <Link key={i} href={`/dich-vu/${s.slug}`} className="service-card">
                    {imgSrc ? (
                      <div className="service-image">
                        <Image
                          src={imgSrc}
                          alt={s.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                      </div>
                    ) : (
                      <div className="service-icon"><FiCheckCircle /></div>
                    )}
                    <div className="service-info">
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Bạn cần dịch vụ {service.title.toLowerCase()}?</h2>
          <p>Liên hệ ngay để được tư vấn miễn phí và báo giá chính xác trong 15 phút</p>
          <div className="cta-actions">
            <Link href="/dat-lich" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
              <FiPhone /> Đặt lịch miễn phí
            </Link>
            <a href="tel:02473088088" className="btn btn-cta-phone">
              <FiPhone /> 024 73 088 088
            </a>
          </div>
          <div className="sd-cta-areas">
            <FiMapPin /> Phục vụ tại: <strong>Hà Nội</strong> & <strong>TP. Hồ Chí Minh</strong>
          </div>
        </div>
      </section>
    </>
  )
}
