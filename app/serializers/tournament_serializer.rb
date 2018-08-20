class TournamentSerializer < ActiveModel::Serializer
  attributes :id,
  :name,
  :organzier,
  :street,
  :city,
  :state,
  :zipcode,
  :description,
  :fee,
  :awards,
  :status,
  :types,
  :website,
  :photo 
end
