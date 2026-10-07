# Student Manager (React Native + Expo)

CRUD sinh viên, lưu bằng AsyncStorage, 3 màn hình, đa ngôn ngữ EN/VI theo thiết bị.
Chạy được trên web, Android, iOS.

## Chạy dự án

```bash
npm install
npx expo install --fix     # tự chỉnh phiên bản thư viện khớp với SDK (nếu cần)
npm run web                # chạy trên trình duyệt
# hoặc
npm start                  # quét QR bằng Expo Go / nhấn a mở Android emulator
```

Nếu lỗi lạ: `npx expo start -c` (xóa cache).
Tên app đa ngôn ngữ chỉ hiện trên bản build; Expo Go luôn hiện "Expo Go".
