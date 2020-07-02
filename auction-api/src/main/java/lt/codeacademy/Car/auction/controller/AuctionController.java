package lt.codeacademy.Car.auction.controller;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.services.PostsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class AuctionController {

    private final PostsService postsService;

    public AuctionController(PostsService postsService) {
        this.postsService = postsService;
    }

    @ApiResponses({
            @ApiResponse(code = 500, message = "Something wrong")
    })

    @GetMapping
    public List<Post> getPosts() {
        return postsService.getAllPosts();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postsService.getPostById(id);
    }

    @PostMapping("/post")
    public Post createPost(
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "price") Integer price) {

        Post post = Post.builder()
                .title(title)
                .price(price)
                .build();

        return postsService.createPost(post,file);
    }

    @GetMapping("/fail")
    public Post getFailure() {
        throw new RuntimeException("This is an error");
    }
}
