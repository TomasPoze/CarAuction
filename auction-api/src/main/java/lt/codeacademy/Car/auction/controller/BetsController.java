package lt.codeacademy.Car.auction.controller;

import lt.codeacademy.Car.auction.entities.Bets;

import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.services.BetsService;
import lt.codeacademy.Car.auction.services.PostsService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bets")
public class BetsController {

    private final BetsService betsService;
    private PostsService postsService;

    public BetsController(BetsService betsService, PostsService postsService) {
        this.betsService = betsService;
        this.postsService = postsService;
    }

    @GetMapping("/{id}")
    public Bets getBetsById(@PathVariable Long id) {
        return betsService.getBetsById(id);
    }

    @GetMapping
    public Page<Bets> getBetsByPostId(@RequestParam(name = "postId", defaultValue = "1") Long postId) {
        return betsService.getBetsByPostId(postId);
    }

    @GetMapping("/all")
    public List<Bets> getBets() {
        return betsService.getBets();
    }

    @PostMapping("/bet")
    public Bets createBet(
            @RequestParam(name = "city") String city,
            @RequestParam(name = "date") String date,
            @RequestParam(name = "sum") Integer sum,
            @RequestParam(name = "username") String username,
            @RequestParam("post_id") Long postId
    ) {

        Post post = postsService.getPostById(postId);
        post.setPrice(sum);

        Bets bets = Bets.builder()
                .city(city)
                .date(date)
                .sum(sum)
                .username(username)
                .post(post)
                .build();

        return betsService.createBets(bets);
    }
}
