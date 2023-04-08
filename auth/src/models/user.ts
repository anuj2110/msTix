import mongoose from "mongoose";
import Password from "../services/password";

// * Interface for User schema

interface UserAttr {
  email: string;
  password: string;
}

// * An interface that describes properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttr): UserDoc;
}

// * An interface that describes the properties that a User document has

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

/*
* We can export this function and use it anywhere we want, but it will cause a lot of hassle.
* The uncommented code written above is much cleaner implementation
* const buildUser = (attrs:UserAttr) => {
*    return new User(attrs)
* }
 
*/
export { User };
