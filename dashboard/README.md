# Dashboard

Hệ thống dashboard quản trị toàn diện cho nền tảng thương mại điện tử, được xây dựng bằng React, Redux và các công nghệ web hiện đại.



## Tính Năng

### 1. Trang Tổng Quan (Dashboard)
- **Hiển Thị Phân Tích**: Sử dụng Recharts để hiển thị dữ liệu thống kê
  - Phân tích doanh thu
  - Thống kê đơn hàng
  - Tăng trưởng khách hàng
  - Chỉ số hiệu suất cửa hàng
- **Dữ Liệu Liên Tục**: Sử dụng Redux Persist để duy trì thống kê mà không cần tải lại trang

### 2. Quản Lý Danh Mục
- **Quản Lý Phân Cấp**: 
  - Danh mục
  - Danh mục con
  - Thuộc tính
- **Công Nghệ**:
  - React Router cho điều hướng
  - Redux Toolkit cho quản lý trạng thái
  - React Toastify cho thông báo

### 3. Quản Lý Sản Phẩm
- **Tính Năng**:
  - Danh sách sản phẩm
  - Thêm/Sửa/Xóa
  - Lọc và sắp xếp nâng cao
  - Tìm kiếm


### 4. Quản Lý Đơn Hàng
- **Theo Dõi Trạng Thái Đơn Hàng**:
  - Chờ xác nhận
  - Đã giao
  - Đã hủy
  - Các trạng thái khác
- **Phân Tích Doanh Thu**: Tích hợp Recharts để hiển thị doanh thu theo tháng/quý
- **Quản Lý Trạng Thái**: Redux Thunk cho các thao tác bất đồng bộ

### 5. Quản Lý Khách Hàng
- **Tính Năng**:
  - Danh sách khách hàng
  - Theo dõi lịch sử mua hàng
  - Hệ thống phê duyệt cửa hàng


### 6. Quản Lý Cửa Hàng
- **Tính Năng Cửa Hàng**:
  - Khả năng đăng sản phẩm
  - Quản lý đơn hàng
  - Quản lý hồ sơ
- **Kiểm Soát Admin**: Hệ thống phê duyệt cửa hàng

## Stack Công Nghệ

### Công Nghệ Chính
- React
- Redux + Redux Toolkit
- React Router
- Recharts

### Quản Lý Trạng Thái
- Redux cho trạng thái toàn cục
- Redux Persist cho duy trì dữ liệu
- Redux Thunk cho xử lý bất đồng bộ

### Giao Diện
- React Toastify cho thông báo- Components tùy chỉnh cho lọc và sắp xếp

