Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post "/signup", to: "users#create"
      post "/login", to: "sessions#create"
      get "/authorized", to: "sessions#show"
      resources :users
    end
  end
  # Defines the root path route ("/")
  # root "user#index"
end
