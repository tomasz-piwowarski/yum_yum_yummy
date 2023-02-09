import { Dispatch, SetStateAction } from "react";
import {
  Control,
  FieldErrorsImpl,
  FieldValues,
  UseFieldArrayReturn,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export type ingredient = {
  ingredient: string;
  value: string;
  unit: string;
};

export type photo = {
  photo: string;
};

export type tag = { tag: string };

export type step = { step: string };

export interface CreatePostInputInterface {
  inputName:
    | "type"
    | "title"
    | "description"
    | "ingredients"
    | "steps"
    | "tags"
    | "region"
    | "category"
    | "subcategory"
    | `tags.${number}.tag`
    | `steps.${number}.step`
    | `ingredients.${number}.ingredient`
    | `ingredients.${number}.value`
    | `ingredients.${number}.unit`;
  placeholder: string;
  options?: {};
  register: UseFormRegister<CreateEditPostInterface>;
  additionalClasses?: string;
}

export interface CreatePostSelectInterface extends CreatePostInputInterface {
  children: JSX.Element;
}

export interface CreatePost {
  type: string;
  title: string;
  description: string;
  region: string;
  category: string;
  subcategory: string;
  ingredients?: ingredient[];
  steps?: step[];
  tags: tag[];
  photos?: photo[];
}

export type CreateEditPostInterface<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = CreatePost;

export interface ShortPostInterface {
  img: string;
  title: string;
  description: string;
  tags: tag[];
  additionalClasses?: string;
  region: string;
  category: string;
  likes: string[];
  username: string;
  profilePicture: string;
  priority?: boolean;
}

export interface ShortData extends ShortPostInterface {
  _id: string;
  photos: { _id: string; photo: string }[];
  title: string;
  description: string;
  tags: tag[];
  additionalClasses?: string;
  region: string;
  category: string;
  likes: string[];
  profile_id: { username: string; profilePicture: string; _id: string };
}

export interface PostInterface extends CreatePost {
  additionalClasses?: string;
  currentPhotoIndex: number;
  previousPhoto(): void;
  nextPhoto(): void;
  unoptimized?: boolean;
  author: string;
  authorProfilePicture: string;
  img: string;
  postCreation?: boolean;
  likes: string[];
  handleOpen?(): void;
  usersPost?: boolean;
  showDot?: boolean;
  post_id?: string;
}

export interface CreatePostPreviewInterface extends CreateEditPostInterface {
  additionalClasses?: string;
  currentPhotoIndex: number;
  previousPhoto(): void;
  nextPhoto(): void;
  unoptimized?: boolean;
  author: string;
  authorProfilePicture: string;
  img: string;
  postCreation?: boolean;
  likes: string[];
  handleOpen?(): void;
  usersPost?: boolean;
  showDot?: boolean;
  post_id?: string;
}

export type tagsFieldArray = UseFieldArrayReturn<CreatePost, "tags", "id">;

export type ingredientsFieldArray = UseFieldArrayReturn<
  CreatePost,
  "ingredients",
  "id"
>;

export type stepsFieldArray = UseFieldArrayReturn<CreatePost, "steps", "id">;

export interface CreatePostFormInterface {
  addPhoto: (arg: FileList) => void;
  blobPhotos: string[];
  deletePhoto: (index: number, e: any) => void;
  register: UseFormRegister<CreateEditPostInterface>;
  handleSubmit: UseFormHandleSubmit<CreatePost>;
  errors: Partial<FieldErrorsImpl<CreatePost>>;
  type?: string;
  tagsFieldArray: tagsFieldArray;
  ingredientsFieldArray: ingredientsFieldArray;
  stepsFieldArray: stepsFieldArray;
  region?: string;
  handlePost(data: CreateEditPostInterface): void;
  buttonText: string;
  defaultValues?: CreatePost;
}

export interface SearchFormInterface {
  register: UseFormRegister<Search>;
  handleSubmit: UseFormHandleSubmit<Search>;
  search: (data: Search) => void;
  control: Control<Search, any>;
}

export interface FieldsInterface {
  register: UseFormRegister<CreatePost>;
  errors: FieldErrorsImpl<CreatePost>;
}

export interface IngredientsFieldsInterface extends FieldsInterface {
  fieldArray: ingredientsFieldArray;
  defaultValue: ingredient;
}

export interface StepsFieldsInterface extends FieldsInterface {
  fieldArray: stepsFieldArray;
  defaultValue: step;
}

export interface TagsFieldsInterface extends FieldsInterface {
  fieldArray: tagsFieldArray;
  defaultValue: tag;
}

export interface BioInterface {
  profilePicture: string;
  username: string;
  postsLength: number;
  followersLength: string[];
  followingLength: string[];
  description: string;
  short?: boolean;
  userProfile?: boolean;
  isFollowing?: boolean;
  toggleFollow?: () => void;
  isChattingWith?: boolean;
}

export interface Post extends CreatePost {
  _id: string;
  photos: photo[];
  comments: string[];
  likes: string[];
  created: number;
}

export interface Commenter {
  profilePicture: string;
  username: string;
}

export interface Comment {
  _id: string;
  profile_id: Commenter;
  author: string;
  text: string;
  post_id: string;
  created: Date;
}

export interface Search {
  title: string;
  tags: string;
  region?: { value: string; label: string }[];
  category?: { value: string; label: string }[];
  ingredients: string;
}

export interface PostHeaderInterface {
  authorProfilePicture: string;
  author: string;
  short?: boolean;
  postCreation?: boolean;
  likes: string[];
  usersPost?: boolean;
  showDot?: boolean;
  post_id?: string;
}

export interface PostBodyInterface {
  title?: string;
  description?: string;
  short?: boolean;
  type?: string;
  ingredients?: ingredient[];
  steps?: step[];
  region?: string;
  category?: string;
}

export interface PostTagsInterface {
  tags?: tag[];
  short?: boolean;
}

export interface EditProfileInterface {
  username: string;
  description: string;
  profilePicture?: any;
}

export interface SearchProfileResult {
  _id: string;
  profilePicture: string;
  username: string;
  posts: Post[];
  description: string;
  followers: string[];
  following: string[];
}

export interface SearchPostResult {
  _id: string;
  img: string;
  title: string;
  description: string;
  tags: tag[];
  additionalClasses?: string;
  region: string;
  category: string;
}

export interface Result {
  posts: SearchPostResult[];
  profiles: SearchProfileResult[];
}

export interface MessageInterface {
  _id: string;
  profile_id: string;
  send: Date;
  text: string;
}

export interface Member {
  _id: string;
  username: string;
  profilePicture: string;
}

export interface Chat {
  _id: string;
  members: Member[];
  messages: MessageInterface[];
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface extends LoginInterface {
  username: string;
}

export interface ChatHeaderInterface {
  handleModal: () => void;
  handleChatId: (id: string) => void;
}

export interface ChatSelectorInterface extends ChatHeaderInterface {
  chats: Chat[];
  profile_id: string;
}

export interface MessageInputInterface {
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  sendMessage: () => void;
}

export interface MessagesInterface {
  messages: MessageInterface[];
  profile_id: string;
  members: Member[];
}
