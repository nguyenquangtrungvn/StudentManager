import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

const translations = {
  en: {
    appTitle: 'Student Manager',
    detailTitle: 'Student details',
    addTitle: 'Add student',
    editTitle: 'Edit student',
    searchPlaceholder: 'Search by name or ID...',
    emptyList: 'No students yet. Tap + to add one.',
    noResult: 'No matching students.',
    fullName: 'Full name',
    studentId: 'Student ID',
    email: 'Email',
    avatar: 'Avatar',
    avatarUrl: 'Avatar URL (https://...)',
    pickImage: 'Pick from device',
    removeImage: 'Remove image',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    yes: 'Yes',
    no: 'No',
    confirmTitle: 'Confirm',
    confirmEdit: 'Do you want to update this student?',
    confirmDelete: 'Do you want to delete this student?',
    errName: 'Full name is required',
    errStudentId: 'Student ID is required',
    errStudentIdDup: 'Student ID already exists',
    errEmail: 'Email is required',
    errEmailInvalid: 'Email is invalid',
    notFound: 'Student not found',
    photoFromDevice: '(image picked from device)',
  },
  vi: {
    appTitle: 'Quản lý Sinh viên',
    detailTitle: 'Thông tin sinh viên',
    addTitle: 'Thêm sinh viên',
    editTitle: 'Sửa sinh viên',
    searchPlaceholder: 'Tìm theo tên hoặc MSSV...',
    emptyList: 'Chưa có sinh viên. Nhấn + để thêm.',
    noResult: 'Không tìm thấy sinh viên phù hợp.',
    fullName: 'Họ tên',
    studentId: 'Mã số SV',
    email: 'Email',
    avatar: 'Ảnh đại diện',
    avatarUrl: 'Link ảnh đại diện (https://...)',
    pickImage: 'Chọn ảnh từ thiết bị',
    removeImage: 'Xóa ảnh',
    save: 'Lưu',
    edit: 'Sửa',
    delete: 'Xóa',
    yes: 'Có',
    no: 'Không',
    confirmTitle: 'Xác nhận',
    confirmEdit: 'Bạn có muốn sửa thông tin SV không?',
    confirmDelete: 'Bạn có muốn xóa thông tin SV không?',
    errName: 'Họ tên không được để trống',
    errStudentId: 'Mã số SV không được để trống',
    errStudentIdDup: 'Mã số SV đã tồn tại',
    errEmail: 'Email không được để trống',
    errEmailInvalid: 'Email không hợp lệ',
    notFound: 'Không tìm thấy sinh viên',
    photoFromDevice: '(ảnh chọn từ thiết bị)',
  },
};

const i18n = new I18n(translations);
i18n.defaultLocale = 'en';
i18n.enableFallback = true;
// Tự động theo ngôn ngữ của thiết bị
i18n.locale = getLocales()[0]?.languageCode ?? 'en';

export const t = (key, options) => i18n.t(key, options);
export default i18n;
