package lt.codeacademy.Car.auction.services;

import lt.codeacademy.Car.auction.entities.Post;
import lt.codeacademy.Car.auction.repositories.PostRepository;
import lt.codeacademy.Car.auction.services.exceptions.PostNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PostsService {
    private PostRepository postRepository;
    private FileStorageService fileStorageService;

    public PostsService(PostRepository postRepository, FileStorageService fileStorageService) {
        this.postRepository = postRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post createPost(Post post, MultipartFile file) {
        if (file != null){
            post.setFileName(file.getOriginalFilename());
            fileStorageService.storeFile(file);
        }
        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post with id: " + id + " was not found"));
    }

    public Page<Post> getPostsPaginated(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return postRepository.findAll(pageable);
    }
}