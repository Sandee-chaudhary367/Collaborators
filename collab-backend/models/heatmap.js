const mongoose=require("mongoose");

const heatmapSchema=new mongoose.Schema( {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    data:[[Number]]
},{
    timestamps:true
})

const heatmap = mongoose.model('heatmap',heatmapSchema);
module.exports=heatmap;
