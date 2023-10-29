class Payment {
  String id;
  String status;

  Payment(this.id, this.status);

  Payment.fromMap(Map<String, dynamic> data) :
    id = data['id'],
    status = data['status'];

  Payment.fromJson(dynamic data) :
    id = data['id'],
    status = data['status'];

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'status': status
    };
  }
}