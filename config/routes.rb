Rails.application.routes.draw do
  root 'teams#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :teams, only: [:index, :show, :new, :create, :edit, :update]
  resources :search, only: [:index]

  namespace :api do
    namespace :v1 do
      post "/teams/search", to: "teams#search"
      resources :teams, only: [:index, :show, :new, :create, :edit, :update] do
      end
    end
  end

  namespace :api do
    namespace :v1 do
      get "/meetups/search", to: "meetups#search"
      post "/meetups/search", to: "meetups#search"
    end
  end
end
