Rails.application.routes.draw do
  root 'teams#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :teams
  resources :meetups, only: [:index]

  namespace :api do
    namespace :v1 do
      post "/meetups/search", to: "meetups#search"
      get "/meetups/search", to: "meetups#search"
      # post "/teams/search", to: "teams#search"
      # get "/teams/search", to: "teams#search"
      resources :teams
      resources :tournaments, only: [:index, :show, :new, :create]
    end
  end

  resources :tournaments, only: [:index, :show, :new, :create]
  # namespace :api do
  #   namespace :v1 do
  #     # resources :tournaments, only: [:index, :show, :new, :create]
  #   end
  # end

end
