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

    @Column(name = "title")
    @NotEmpty
    private String title;

    @Column(name = "price")
    @DecimalMin("1")
    @NotNull
    private Integer price;

    @Column(name = "file_name")
    private String fileName;

    @Tolerate
    public Post(){}
}
