package lt.codeacademy.Car.auction.services.exceptions;

public class BetNotFoundException extends RuntimeException{
    public BetNotFoundException(String message){
        super(message);
    }
}
