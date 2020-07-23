package lt.codeacademy.Car.auction.entities;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import javax.persistence.*;


@Data
@Builder
@Entity
@Table(name = "Posts")
@ApiModel(value = "Post", description = "A post in auction")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    @ApiModelProperty(hidden = true)
    private Long id;

    @Column(name = "make")
    @NotEmpty
    private String make;

    @Column(name = "model")
    @NotEmpty
    private String model;

    @Column(name = "year")
    @NotEmpty
    private Integer year;

    @Column(name = "km")
    private Long km;

    @Column(name = "gearbox")
    @NotEmpty
    private String gearbox;

    @Column(name = "fuel")
    @NotEmpty
    private String fuel;

    @Column(name = "city")
    @NotEmpty
    private String city;

    @Column(name = "price")
    @DecimalMin("1")
    @NotNull
    private Integer price;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "bet_time")
    private Integer betTime;

    @Tolerate
    public Post(){}
}
