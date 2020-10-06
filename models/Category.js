const mongoose = require('mongoose');
const slugify = require('slugify');
const CategorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
            maxLength: [50, 'Name can not be longer than 50 characters']
        },
        slug: String,
        background_link: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                'Please use a valid URL with HTTP or HTTPS'
            ],
            required: true

        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    });

//Create category slug from the name
CategorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
})


//Cascade delete items when a category is deleted
CategorySchema.pre('remove', async function (next) {
    console.log(`Items being removed from category ${this._id}`);
    await this.model('Item').deleteMany({category: this._id});
    next();
});


//Reverse Populate with virtuals
CategorySchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'category',
    justOne: false

})


module.exports = mongoose.model('Category', CategorySchema);