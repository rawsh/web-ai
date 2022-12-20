# In-browser AI

- ONNX Runtime
- Hugging Face compatible

## Status

The library is under active development. If something does not work correctly, please file an issue on GitHub. Contributions are very welcome.

## Model types

### Text models

- Sequence-to-sequence (`TextModelType.Seq2Seq`). These models are used to transform the text into another text. Examples of such transformations are translation, summarization, and grammar correction.
- Feature extarction (`TextModelType.FeatureExtraction`). These models are used to transform the text into an array of numbers - embedding. Generated vectors are useful for semantic search or cluster analysis because embeddings of semantically similar text are similar and can be compared using [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity).

### Image models

- Semantic segmentation (`ImageModelType.Segmentation`). These models cluster images into parts which belong to the same object class. In other words, segmentation models detect exact shape of the objects in the image and classify them. The example of image segmentation is below.

  ![Semantic segmentation example](/images/segment.jpg)

- Object detection (`ImageModelType.ObjectDetection`). These models find objects in the images, classify them, and generate bounding boxes for the objects. The example of the object detection is below.

  ![Object detection example](/images/detection.jpg)

- Classification (`ImageModelType.Classification`). These models do not find exact objects in the images but they only determine what type of object is the most likely in the image. Because of that, this type of models is the most useful when there is only one distinct class of objects present in the image. In the example below, the image is classified as "Egyptian cat".

  ![Object detection example](/images/classification.jpg)

## Installation

The library can be insatlled via `npm`:

```
npm install in-browser-ai
```

## Create model instance

### Create model from ID

The first way of creating a model is using the model identifier. This method works only for the built-in models.

For text models:

```TypeScript
import { TextModel } from "in-browser-ai";

const model = TextModel.create("grammar-t5-efficient-tiny")
```

For image models:

```TypeScript
import { ImageModel } from "in-browser-ai";

const model = ImageModel.create("yolos-tiny-quant")
```

### Create model from metadata

The second way to create a model is via the model metadata. This method allows to use custom ONNX models. In this case, we need
to use a specific model class.

#### Text models

The metadata for text models is defined by the `TextMetadata` class. Not all fields are required for the model creation. The minimal example for the `Seq2Seq` model is:

```TypeScript
import { Seq2SeqModel, TextMetadata } from "in-browser-ai";

const metadata: TextMetadata = {
    modelPaths: new Map<string, string>([
      [
        "encoder",
        "https://huggingface.co/visheratin/t5-efficient-tiny-grammar-correction/resolve/main/encoder_model.onnx",
      ],
      [
        "decoder",
        "https://huggingface.co/visheratin/t5-efficient-tiny-grammar-correction/resolve/main/decoder_with_past_model.onnx",
      ],
    ]),
    tokenizerPath: "https://huggingface.co/visheratin/t5-efficient-tiny-grammar-correction/resolve/main/tokenizer.json",
  }

const model = new Seq2SeqModel(metadata);
```

The minimal example for the `FeatureExtraction` model is:

```TypeScript
import { FeatureExtractionModel, TextMetadata } from "in-browser-ai";

const metadata: TextMetadata = {
    modelPaths: new Map<string, string>([
      [
        "encoder",
        "https://huggingface.co/visheratin/t5-efficient-tiny-grammar-correction/resolve/main/encoder_model.onnx",
      ],
    ]),
    tokenizerPath: "https://huggingface.co/visheratin/t5-efficient-tiny-grammar-correction/resolve/main/tokenizer.json",
  }

const model = new FeatureExtractionModel(metadata);
```

#### Image models

The metadata for image models is defined by the `ImageMetadata` class. Not all fields are required for the model creation. The minimal example for all image models is:

```TypeScript
import { ImageMetadata } from "in-browser-ai";

const metadata: ImageMetadata = {
    modelPath: "https://huggingface.co/visheratin/segformer-b0-finetuned-ade-512-512/resolve/main/b0.onnx.gz",
    configPath: "https://huggingface.co/visheratin/segformer-b0-finetuned-ade-512-512/resolve/main/config.json",
    preprocessorPath: "https://huggingface.co/visheratin/segformer-b0-finetuned-ade-512-512/resolve/main/preprocessor_config.json",
  }
```

Then, the model can be created:

```TypeScript
import { ClassificationModel, ObjectDetectionModel, SegmentationModel } from "in-browser-ai";

const model = new ClassificationModel(metadata);
// or
const model = new ObjectDetectionModel(metadata);
// or
const model = new SegmentationModel(metadata);

```

## Built-in models

### Image models

#### Semantic segmentation

#### Classification

#### Object detection

### Text models

#### Grammar correction

#### Text feature extraction

## Future development

- Improve grammar correction model.
- Extend text models beyond T5.
- Distil [Flan-T5-small](https://huggingface.co/google/flan-t5-small) model to make it more usable in the browser.
- Add audio models ([Whisper-small](https://huggingface.co/openai/whisper-small)).
