class Payment {
  Payment.fromJson(dynamic data)
      : id = data['id'],
        status = data['status'];

  Payment.fromMap(Map<String, dynamic> data)
      : id = data['id'],
        status = data['status'];

  Payment(this.id, this.status);

  String id;
  String status;

  Map<String, dynamic> toMap() => {
        'id': id,
        'status': status,
      };
}
