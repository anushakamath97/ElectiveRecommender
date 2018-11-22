import numpy as np
from keras.models import Model
from keras.layers import Dense#for layers
from keras.layers import SimpleRNN
from keras.layers import Input

data = np.load("app/models/keywordsData.npy")

vector_length = 32 #the length of each word is 32
max_seq_len = data.shape[1]
output_classes = data.shape[0]

input_layer = Input(shape = (max_seq_len, vector_length))
rnn_layer = SimpleRNN(30)(input_layer)#50 neurons (so length of st = 50)
output_layer = Dense(output_classes ,activation='softmax')(rnn_layer)

model = Model(input_layer,output_layer)
model.compile(loss='categorical_crossentropy',optimizer='RMSProp', metrics=['accuracy'])

targetData = []
for i in range(output_classes):
	targetData.append(np.zeros(39, dtype=np.int32))
	targetData[i][i] = 1

targetData = np.array(targetData)
model.fit(data, targetData,
	epochs = 50,
	batch_size = 1)

testData = []
testData.append(data[13])
model.save("keywords.h5")
