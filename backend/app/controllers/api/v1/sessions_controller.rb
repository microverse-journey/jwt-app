class Api::V1::SessionsController < ApplicationController
    skip_before_action :authorized, only: [:create]
    
    def create
        user = User.find_by_email(session_params[:email])

        if user.present? && user.authenticate(session_params[:password])
            token = issue_token(user)
            render json: {user: UserSerializer.new(user), token: token}
        else
            render json: {error: "Incorrect username or password."}
        end
    end

    def show
        if logged_in?
            render json: current_user
        else
            render json: {error: "User is not logged in/could not be found."}
        end
    end

    private

    def session_params
        params.require(:session).permit(:email, :password)
    end
end