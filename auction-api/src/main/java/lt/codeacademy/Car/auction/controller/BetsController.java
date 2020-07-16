package lt.codeacademy.Car.auction.controller;


import lt.codeacademy.Car.auction.entities.Bets;
import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.services.BetsService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@RestController
@RequestMapping("/bets")
public class BetsController {

    private final BetsService betsService;

    public BetsController(BetsService betsService) {
        this.betsService = betsService;
    }

    @GetMapping("/{id}")
    public Bets getBetsById(@PathVariable Long id) {
        return betsService.getBetsById(id);
    }

    @GetMapping
    public Page<Bets> getBetsByPostId(@RequestParam(name = "postId", defaultValue = "1") Long postId){
        return betsService.getBetsByPostId(postId);
    }

    @PostMapping("/bet")
    public Bets createBet(
            @RequestParam(name = "city") String city,
            @RequestParam(name = "date") String date,
            @RequestParam(name = "sum") Integer sum,
            @RequestParam(name = "username") String username,
            @RequestParam(name = "post_id") Long postId) {

        Bets bets = Bets.builder()
                .city(city)
                .date(date)
                .sum(sum)
                .username(username)
                .postId(postId)
                .build();

        return betsService.createBets(bets);
    }
}
