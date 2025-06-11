package org.tacomaster.tacomaster.dto;

import lombok.Data;

@Data
public class OrderWithUserDTO {
    private Long id;
    private String status;
    private String userEmail;
    private String userName;
    private double totalPrice;
    private String pickupLocation;
    private String paymentMethod;
    private String createdAt;


    public OrderWithUserDTO(Long id, String status, String userEmail, String userName,
                            double totalPrice, String pickupLocation, String paymentMethod, String createdAt) {
        this.id = id;
        this.status = status;
        this.userEmail = userEmail;
        this.userName = userName;
        this.totalPrice = totalPrice;
        this.pickupLocation = pickupLocation;
        this.paymentMethod = paymentMethod;
        this.createdAt = createdAt;
    }


}
