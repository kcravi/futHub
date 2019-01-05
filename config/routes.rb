Rails.application.routes.draw do
  root 'teams#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :teams do
    resources :team_photos, only: [:index, :create]
    resources :posts, only: [:create, :destroy]
  end

  resources :tournaments, only: [:index, :show, :new, :create]
  resources :meetups, only: [:index]

  resources :users, only: [:show, :create] do
    resources :user_photos, only: [:index, :show, :create, :destroy]
    resources :posts, only: [:create, :destroy]
  end

  namespace :api do
    namespace :v1 do
      post "/meetups/search", to: "meetups#search"
      post "/teams/search", to: "teams#search"
      resources :teams do
        resources :team_photos, only: [:index, :create]
        resources :posts, only: [:create, :destroy]
      end
      resources :tournaments, only: [:index, :show, :new, :create]
      resources :registrations, only: [:create]
      # resources :users, only: [:show]
    end
  end
end
