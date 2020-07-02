package lt.codeacademy.Car.auction.services.exceptions;

public class PostNotFoundException extends RuntimeException{
    public PostNotFoundException(String message){
        super(message);
    }

}
