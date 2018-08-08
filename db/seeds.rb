# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

team1 = Team.create(name: "BNFC", city:"Somerville", state:"MA", zipcode:"02145", description:"Boston based Nepalese Football Club", phone_number: "(617)817-2590", website: "www.bnfc.com")
team2 = Team.create(name: "Tibetan Football Club", city:"Somerville", state:"MA", zipcode:"02145", description:"Boston based Tibetan Football Club", phone_number: "(617)617-6176", website: "www.tibetanfootballclub.com")
team3 = Team.create(name: "Medford Pickup Soccer", city:"Medford", state:"MA", zipcode:"02149", description:"A pickup group for adults of all ages, skill levels, and backgrounds looking to have fun playing friendly, small-sided, low impact soccer.", phone_number: "(617)617-6666", website: "www.medfordfc.com")
