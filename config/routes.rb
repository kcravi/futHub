Rails.application.routes.draw do
  root 'teams#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :teams, only: [:index, :show, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :teams, only: [:index, :show, :new, :create] do
      end
    end
  end
end
