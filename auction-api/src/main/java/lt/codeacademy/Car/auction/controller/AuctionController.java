package lt.codeacademy.Car.auction.controller;

import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.services.PostsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class AuctionController {

    private final PostsService postsService;

    public AuctionController(PostsService postsService) {
        this.postsService = postsService;
    }

    @GetMapping("/posts")
    public List<Post> getPosts(){
        return postsService.getAllPosts();
    }
}
