Rails.application.routes.draw do
  root 'teams#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :teams, only: [:index, :show, :new, :create, :edit, :update]

  namespace :api do
    namespace :v1 do
      resources :teams, only: [:index, :show, :new, :create, :edit, :update] do
      end
    end
  end

  namespace :api do
    namespace :v1 do
      get "/teams", to: "teams#search"
      # post 'teams/search', to: 'teams#search'
    end
  end
end
