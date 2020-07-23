package lt.codeacademy.Car.auction.controller;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.services.BetsService;
import lt.codeacademy.Car.auction.services.PostsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class AuctionController {

    private final PostsService postsService;
    private final BetsService betsService;

    public AuctionController(PostsService postsService, BetsService betsSerivce) {
        this.postsService = postsService;
        this.betsService = betsSerivce;
    }

    @ApiResponses({
            @ApiResponse(code = 500, message = "Something wrong")
    })

    @GetMapping
    public List<Post> getProducts(){
        return postsService.getAllPosts();
    }

//    @GetMapping
//    public Page<Post> getProductsPaginated(
//            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") int pageNumber,
//            @RequestParam(name = "pageSize") int pageSize
//    ) {
//        return postsService.getPostsPaginated(pageNumber, pageSize);
//    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postsService.getPostById(id);
    }

    @GetMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public String deletePost(@PathVariable Long id, Model model){
        postsService.deletePost(id);
        List<Post> posts = postsService.getAllPosts();
        model.addAttribute("posts",posts);
        return "posts";
    }

    @PostMapping("/post")
    public Post createPost(
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "make") String make,
            @RequestParam(name = "model") String model,
            @RequestParam(name = "year") Integer year,
            @RequestParam(name = "km") Long km,
            @RequestParam(name = "gearbox") String gearbox,
            @RequestParam(name = "fuel") String fuel,
            @RequestParam(name = "city") String city,
            @RequestParam(name = "price") Integer price,
            @RequestParam(name = "bet_time")Integer betTime)
    {

        Post post = Post.builder()
                .make(make)
                .model(model)
                .year(year)
                .km(km)
                .gearbox(gearbox)
                .fuel(fuel)
                .city(city)
                .price(price)
                .betTime(betTime)
                .build();

        return postsService.createPost(post,file);
    }

    @GetMapping("/fail")
    public Post getFailure() {
        throw new RuntimeException("This is an error");
    }




}
