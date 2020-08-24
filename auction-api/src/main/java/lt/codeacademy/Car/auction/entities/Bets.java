package lt.codeacademy.Car.auction.entities;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;


@Data
@Builder
@Entity
@Table(name = "Bets")
@ApiModel(value = "Bet", description = "Bet")
public class Bets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bet_id")
    @ApiModelProperty(hidden = true)
    private Long id;

    @Column(name = "city")
    private String city;

    @Column(name = "date")
    private String date;

    @Column(name = "sum")
    private Integer sum;

    @Column(name = "username")
    private String username;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Tolerate
    public Bets() {
    }
}
